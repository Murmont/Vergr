import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { gf } from '../../utils/giphyConfig';
import { startVoiceRecording, uploadMediaFile, getYouTubeID } from '../../utils/mediaHelpers';
import { Grid } from '@giphy/react-components';
import Icon from '../../components/Icon';
// Corrected path and name
import SquadPollComponent from '../../components/SquadPollComponent'; 

export default function SquadChatThreadScreen({ isAdmin }) {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showGiphy, setShowGiphy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  // 1. Real-time Firestore Listener
  useEffect(() => {
    const q = query(collection(db, 'squads', squadId, 'messages'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      
      // Auto-mark messages as read
      msgs.forEach(m => {
        if (!m.readBy?.includes(auth.currentUser?.uid)) {
          updateDoc(doc(db, 'squads', squadId, 'messages', m.id), {
            readBy: arrayUnion(auth.currentUser?.uid)
          });
        }
      });

      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });
    return () => unsub();
  }, [squadId]);

  // 2. Messaging Logic
  const sendMsg = async (data) => {
    if (!auth.currentUser) return;
    await addDoc(collection(db, 'squads', squadId, 'messages'), {
      ...data,
      senderId: auth.currentUser.uid,
      senderName: auth.currentUser.displayName || 'Anonymous',
      senderAvatar: auth.currentUser.photoURL || '',
      createdAt: serverTimestamp(),
      readBy: [auth.currentUser.uid],
      reactions: {}
    });
  };

  // 3. Voice Logic
  const handleVoiceStop = async (rec) => {
    setIsRecording(false);
    const audioBlob = await rec.stop().getBlob();
    const url = await uploadMediaFile(audioBlob, 'squad_voice');
    sendMsg({ type: 'voice', contentUrl: url });
  };

  // 4. Reaction Logic
  const addReaction = async (msgId, emoji) => {
    const msgRef = doc(db, 'squads', squadId, 'messages', msgId);
    await updateDoc(msgRef, {
      [`reactions.${auth.currentUser.uid}`]: emoji
    });
  };

  // 5. Delete Logic (Admin only)
  const deleteMsg = async (msgId) => {
    if (!isAdmin) return;
    await deleteDoc(doc(db, 'squads', squadId, 'messages', msgId));
  };

  // 6. Voting Logic
  const handlePollVote = async (msgId, optionIndex) => {
    const msgRef = doc(db, 'squads', squadId, 'messages', msgId);
    await updateDoc(msgRef, {
      [`pollData.votes.${optionIndex}`]: serverTimestamp(), // Simple logic for tracking
      'pollData.voters': arrayUnion(auth.currentUser.uid)
    });
  };

  // 7. Render Message Content
  const renderMessageContent = (m) => {
    // Corrected to use the component you created
    if (m.type === 'poll') return (
      <SquadPollComponent 
        pollData={m.pollData} 
        onVote={(index) => handlePollVote(m.id, index)} 
      />
    );
    
    const ytId = m.type === 'text' ? getYouTubeID(m.text) : null;

    if (m.type === 'gif') return <img src={m.contentUrl} alt="gif" className="rounded-xl w-full max-w-[200px]" />;
    if (m.type === 'image') return <img src={m.contentUrl} alt="upload" className="rounded-xl w-full max-w-[250px]" />;
    if (m.type === 'video') return <video src={m.contentUrl} controls className="rounded-xl w-full max-w-[250px]" />;
    if (m.type === 'voice') return <audio src={m.contentUrl} controls className="h-8 max-w-[200px]" />;
    
    return (
      <div className="space-y-2">
        <p className="leading-relaxed">{m.text}</p>
        {ytId && (
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 mt-2">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-bg-dark text-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => {
          const isMe = m.senderId === auth.currentUser?.uid;
          const showAvatar = i === 0 || messages[i-1].senderId !== m.senderId;

          return (
            <div key={m.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
              {!isMe && showAvatar && (
                <img src={m.senderAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${m.senderId}`} className="w-8 h-8 rounded-full bg-surface-2" />
              )}
              {!isMe && !showAvatar && <div className="w-8" />}
              
              <div className={`group relative max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-4 py-2.5 rounded-2xl ${isMe ? 'bg-brand-cyan text-bg-dark rounded-tr-none' : 'bg-surface-2 text-white rounded-tl-none border border-white/5'}`}>
                  {renderMessageContent(m)}
                </div>

                {/* Reaction Display */}
                {m.reactions && Object.keys(m.reactions).length > 0 && (
                  <div className={`flex gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {Object.entries(m.reactions).map(([uid, emoji]) => (
                      <span key={uid} className="text-[10px] bg-surface-3 px-1.5 py-0.5 rounded-full border border-white/10">{emoji}</span>
                    ))}
                  </div>
                )}

                {/* Admin Actions */}
                {isAdmin && (
                  <button onClick={() => deleteMsg(m.id)} className="opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg transition-opacity">
                    <Icon name="close" size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Giphy Grid */}
      {showGiphy && (
        <div className="h-64 border-t border-white/10 bg-surface-1">
          <Grid width={window.innerWidth} columns={3} fetchGifs={(offset) => gf.trending({ offset, limit: 10 })} 
            onGifClick={(gif, e) => { e.preventDefault(); sendMsg({ type: 'gif', contentUrl: gif.images.fixed_height.url }); setShowGiphy(false); }} />
        </div>
      )}

      {/* Input Bar */}
      <div className="p-4 bg-surface-1/50 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center gap-2">
          {!isRecording ? (
            <>
              <button onClick={() => setShowGiphy(!showGiphy)} className={`p-2 rounded-full ${showGiphy ? 'text-brand-cyan' : 'text-text-muted'}`}><Icon name="gif" size={24} /></button>
              <div className="flex-1 bg-surface-2 rounded-full px-4 py-2 flex items-center border border-white/5 focus-within:border-brand-cyan/50 transition-all">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && input.trim() && (sendMsg({ text: input, type: 'text' }), setInput(''))}
                  placeholder="Type a message..." className="flex-1 bg-transparent outline-none text-sm" />
                
                <input type="file" id="img-up" accept="image/*" hidden onChange={async e => {
                   if (!e.target.files[0]) return;
                   const url = await uploadMediaFile(e.target.files[0], 'squad_images');
                   sendMsg({ type: 'image', contentUrl: url });
                }} />
                <label htmlFor="img-up" className="cursor-pointer"><Icon name="image" size={20} className="text-text-muted ml-2" /></label>
                
                <input type="file" id="vid-up" accept="video/*" hidden onChange={async e => {
                   if (!e.target.files[0]) return;
                   const url = await uploadMediaFile(e.target.files[0], 'squad_videos');
                   sendMsg({ type: 'video', contentUrl: url });
                }} />
                <label htmlFor="vid-up" className="cursor-pointer"><Icon name="videocam" size={20} className="text-text-muted ml-2" /></label>
              </div>
              {input.trim() ? (
                <button onClick={() => { sendMsg({ text: input, type: 'text' }); setInput(''); }} className="bg-brand-cyan p-2.5 rounded-full text-bg-dark"><Icon name="send" size={18} /></button>
              ) : (
                <button onMouseDown={async () => { setIsRecording(true); const r = await startVoiceRecording(); setRecorder(r); }} onMouseUp={() => handleVoiceStop(recorder)} className="bg-surface-2 p-2.5 rounded-full text-white"><Icon name="mic" size={18} /></button>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center gap-4 bg-red-500/10 rounded-full px-4 py-2 border border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-red-500 text-xs font-bold flex-1 uppercase tracking-widest">Recording Voice...</span>
              <button onMouseUp={() => handleVoiceStop(recorder)} className="text-red-500 font-bold text-xs">STOP</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}