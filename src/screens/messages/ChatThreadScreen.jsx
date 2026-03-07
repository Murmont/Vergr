import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { gf } from '../../utils/giphyConfig';
import { startVoiceRecording, uploadMediaFile, getYouTubeID } from '../../utils/mediaHelpers';
import { Grid } from '@giphy/react-components';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function ChatThreadScreen() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [input, setInput] = useState('');
  const [showGiphy, setShowGiphy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'conversations', chatId, 'messages'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    onSnapshot(doc(db, 'conversations', chatId), (d) => setChatInfo(d.data()));
    return () => unsub();
  }, [chatId]);

  const sendMsg = async (payload) => {
    await addDoc(collection(db, 'conversations', chatId, 'messages'), {
      senderId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      ...payload
    });
    await updateDoc(doc(db, 'conversations', chatId), {
      lastMessageText: payload.text || `Sent a ${payload.type}`,
      lastMessageAt: serverTimestamp()
    });
  };

  const handleVoiceStop = async (rec) => {
    if (!rec) return;
    rec.stop();
    rec.ondataavailable = async (e) => {
      const url = await uploadMediaFile(e.data, 'voice_notes');
      sendMsg({ type: 'voice', contentUrl: url });
    };
    setIsRecording(false);
  };

  const renderMessageContent = (m) => {
    const ytId = m.type === 'text' ? getYouTubeID(m.text) : null;
    if (ytId) {
      return (
        <div className="flex flex-col">
          <p className="px-4 py-2.5 text-sm">{m.text}</p>
          <iframe src={`https://www.youtube.com/embed/${ytId}`} className="w-full aspect-video" allowFullScreen title="YT" />
        </div>
      );
    }
    switch (m.type) {
      case 'giphy': return <img src={m.contentUrl} className="w-full" alt="giphy" />;
      case 'image': return <img src={m.contentUrl} className="w-full max-h-80 object-cover" />;
      case 'video': return <video controls className="w-full max-h-80 bg-black"><source src={m.contentUrl} /></video>;
      case 'voice': return (
        <div className="flex items-center gap-3 p-3 min-w-[200px]">
          <Icon name="play_circle" size={32} />
          <audio src={m.contentUrl} controls className="hidden" id={`audio-${m.id}`} />
          <div className="flex-1 h-1 bg-black/20 rounded-full" />
          <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Voice</span>
        </div>
      );
      default: return <p className="px-4 py-2.5 text-sm leading-relaxed">{m.text}</p>;
    }
  };

  const otherUserId = chatInfo?.participants?.find(id => id !== auth.currentUser?.uid);
  const otherUser = chatInfo?.metadata?.[otherUserId];

  return (
    <div className="screen-container h-screen flex flex-col bg-bg-dark overflow-hidden">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border-accent bg-bg-dark/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)}><Icon name="arrow_back" size={24} /></button>
        <div className="flex-1 min-w-0" onClick={() => navigate(`/messages/${chatId}/settings`)}>
          <h2 className="text-white font-bold text-sm truncate">{chatInfo?.isGroup ? chatInfo.groupName : otherUser?.name || 'Loading...'}</h2>
          <p className="text-[10px] text-brand-cyan font-bold uppercase tracking-tighter">Active Now</p>
        </div>
        <button onClick={() => navigate(`/messages/${chatId}/settings`)}><Icon name="info" size={22} /></button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m) => {
          const isMe = m.senderId === auth.currentUser.uid;
          return (
            <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl overflow-hidden ${isMe ? 'bg-brand-cyan text-bg-dark font-medium shadow-lg shadow-brand-cyan/10' : 'bg-surface-2 text-white border border-white/5'}`}>
                {renderMessageContent(m)}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </main>

      {showGiphy && (
        <div className="h-80 bg-surface-1 border-t border-border-accent overflow-y-auto">
          <Grid width={window.innerWidth} columns={3} fetchGifs={(offset) => gf.trending({ offset, limit: 10 })} onGifClick={(gif, e) => {
            e.preventDefault(); sendMsg({ type: 'giphy', contentUrl: gif.images.fixed_height.url }); setShowGiphy(false);
          }} gutter={4} />
        </div>
      )}

      <footer className="p-4 bg-bg-dark border-t border-border-accent">
        <div className="flex items-center gap-2">
          {!isRecording ? (
            <>
              <button onClick={() => setShowGiphy(!showGiphy)}><Icon name="gif_box" size={28} className={showGiphy ? 'text-brand-cyan' : 'text-text-muted'} /></button>
              <div className="flex-1 flex items-center bg-surface-1 rounded-full px-4 border border-border-accent/50 focus-within:border-brand-cyan">
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 bg-transparent py-2.5 text-sm text-white outline-none" />
                
                {/* Image Upload */}
                <input type="file" id="img-up" accept="image/*" hidden onChange={async e => {
                   if (!e.target.files[0]) return;
                   const url = await uploadMediaFile(e.target.files[0], 'chat_images');
                   sendMsg({ type: 'image', contentUrl: url });
                }} />
                <label htmlFor="img-up" className="cursor-pointer"><Icon name="image" size={20} className="text-text-muted ml-2" /></label>
                
                {/* Video Upload */}
                <input type="file" id="vid-up" accept="video/*" hidden onChange={async e => {
                   if (!e.target.files[0]) return;
                   const url = await uploadMediaFile(e.target.files[0], 'chat_videos');
                   sendMsg({ type: 'video', contentUrl: url });
                }} />
                <label htmlFor="vid-up" className="cursor-pointer"><Icon name="videocam" size={20} className="text-text-muted ml-2" /></label>
              </div>
              {input.trim() ? (
                <button onClick={() => { sendMsg({ text: input, type: 'text' }); setInput(''); }} className="w-10 h-10 rounded-full bg-brand-cyan text-bg-dark flex items-center justify-center"><Icon name="send" size={20} /></button>
              ) : (
                <button onMouseDown={async () => { setIsRecording(true); const r = await startVoiceRecording(); setRecorder(r); }} onMouseUp={() => handleVoiceStop(recorder)} className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-white"><Icon name="mic" size={20} /></button>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center gap-4 bg-red-500/10 rounded-full px-4 py-2 border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-red-500 text-sm font-bold flex-1">Recording... Release to send</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}