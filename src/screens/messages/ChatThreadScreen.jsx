import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

const DEMO_CHATS = {
  c1: {
    isGroup: false, name: 'Alex Rivera', online: true, tier: 'Gold',
    messages: [
      { id:'m1', sender:'them', senderName:'Alex Rivera', text:'Hey! Are you joining the tournament tonight?', time:'9:15 AM' },
      { id:'m2', sender:'me', text:"Yeah I'm in! What time does it start?", time:'9:17 AM' },
      { id:'m3', sender:'them', senderName:'Alex Rivera', text:'8PM EST. Squad is already locked in 🔥', time:'9:18 AM' },
      { id:'m4', sender:'them', senderName:'Alex Rivera', text:'Also check out my new stream setup', time:'9:18 AM', image:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400' },
      { id:'m5', sender:'me', text:'That setup is INSANE 🔥🔥', time:'9:20 AM' },
    ],
  },
  c2: {
    isGroup: true, name: 'Vergr Core Team', members: [
      { username:'Maya', tier:'Diamond', color:'#51fbd9' },
      { username:'Jake', tier:'Silver', color:'#7B6FFF' },
      { username:'Priya', tier:'Gold', color:'#FFD700' },
      { username:'You', tier:'Gold', color:'#C87FFF' },
    ],
    messages: [
      { id:'g1', sender:'Maya', senderName:'Maya', color:'#51fbd9', text:'Has everyone tested the new build?', time:'10:05 AM' },
      { id:'g2', sender:'Jake', senderName:'Jake', color:'#7B6FFF', text:'Running through it now. Feed looks clean.', time:'10:08 AM' },
      { id:'g3', sender:'me', text:'Shop screen has a layout bug on small phones', time:'10:10 AM' },
      { id:'g4', sender:'Priya', senderName:'Priya', color:'#FFD700', text:'I see it too. Opening a ticket.', time:'10:11 AM' },
      { id:'g5', sender:'Maya', senderName:'Maya', color:'#51fbd9', text:'The new update looks 🔥', time:'10:15 AM' },
    ],
  },
  c4: {
    isGroup: true, name: 'Apex Predators Squad', members: [
      { username:'NeonBlade', tier:'Gold', color:'#51fbd9' },
      { username:'PixelQueen', tier:'Diamond', color:'#C87FFF' },
      { username:'FragMaster', tier:'Silver', color:'#7B6FFF' },
      { username:'You', tier:'Gold', color:'#FFD700' },
    ],
    messages: [
      { id:'s1', sender:'NeonBlade', senderName:'NeonBlade', color:'#51fbd9', text:'Tournament starts at 8PM EST', time:'Yesterday' },
      { id:'s2', sender:'PixelQueen', senderName:'PixelQueen', color:'#C87FFF', text:'I warmed up in ranked. Feeling good 💪', time:'Yesterday' },
      { id:'s3', sender:'me', text:"Let's run some practice rounds first", time:'Yesterday' },
      { id:'s4', sender:'FragMaster', senderName:'FragMaster', color:'#7B6FFF', text:'Agreed. Meet in Discord VC at 7:30?', time:'Yesterday' },
    ],
  },
};

export default function ChatThreadScreen() {
  const { chatId } = useParams();
  const chat = DEMO_CHATS[chatId] || DEMO_CHATS.c1;
  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState('');
  const [showAttach, setShowAttach] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`, sender: 'me', text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput('');
  };

  const sendCoins = (amount) => {
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`, sender: 'me', type: 'coins', amount,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setShowCoins(false);
  };

  return (
    <div className="screen-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/messages')} className="w-9 h-9 rounded-full bg-surface-2/80 flex items-center justify-center">
              <Icon name="arrow_back" size={20} />
            </button>
            <button onClick={() => navigate(`/messages/${chatId}/settings`)} className="flex items-center gap-3">
              {chat.isGroup ? (
                <div className="relative w-10 h-10">
                  <div className="absolute top-0 left-0 w-7 h-7 rounded-full bg-surface-border flex items-center justify-center text-xs font-bold text-primary border-2 border-bg-dark z-10">{chat.members.length}</div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-surface flex items-center justify-center border-2 border-bg-dark"><Icon name="groups" size={14} className="text-text-secondary" /></div>
                </div>
              ) : (
                <div className="relative">
                  <UserAvatar username={chat.name} tier={chat.tier} size={40} />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-dark rounded-full" />}
                </div>
              )}
              <div>
                <h1 className="font-syne text-sm font-bold text-white">{chat.name}</h1>
                <span className="text-[10px] text-text-secondary">
                  {chat.isGroup ? `${chat.members.length} members` : chat.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-1">
            {!chat.isGroup && <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-2"><Icon name="videocam" size={22} className="text-text-secondary" /></button>}
            <button onClick={() => navigate(`/messages/${chatId}/settings`)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-2"><Icon name="more_vert" size={22} className="text-text-secondary" /></button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const isMe = msg.sender === 'me';
          const showSender = chat.isGroup && !isMe && (idx === 0 || messages[idx-1].sender !== msg.sender);

          if (msg.type === 'coins') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-2 text-center">
                  <p className="text-primary text-sm font-bold flex items-center gap-1 justify-center">
                    <Icon name="monetization_on" size={16} /> Sent {msg.amount} coins
                  </p>
                  <p className="text-text-secondary text-[10px]">{msg.time}</p>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%]`}>
                {showSender && (
                  <p className="text-xs font-bold mb-1 ml-1" style={{ color: msg.color || '#51fbd9' }}>
                    {msg.senderName}
                  </p>
                )}
                {msg.image && (
                  <div className="mb-1 rounded-2xl overflow-hidden border border-surface-border/30">
                    <img src={msg.image} alt="" className="w-full max-w-[280px] object-cover rounded-2xl" />
                  </div>
                )}
                {msg.text && (
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    isMe
                      ? 'bg-gradient-to-r from-primary/80 to-purple-500/80 text-white rounded-br-md'
                      : 'bg-surface border border-surface-border text-white rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                )}
                <p className={`text-[10px] mt-1 text-text-secondary ${isMe ? 'text-right' : ''}`}>
                  {msg.time}{isMe && <span className="ml-1 text-primary">✓✓</span>}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Coin send overlay */}
      {showCoins && (
        <div className="border-t border-surface-border bg-surface p-4">
          <p className="text-text-secondary text-xs font-bold uppercase mb-3">Send Coins</p>
          <div className="flex gap-2">
            {[10, 50, 100, 500].map(amt => (
              <button key={amt} onClick={() => sendCoins(amt)} className="flex-1 py-3 bg-primary/10 border border-primary/20 rounded-xl text-center">
                <Icon name="monetization_on" size={16} className="text-primary mx-auto" />
                <span className="text-primary text-sm font-bold block">{amt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment overlay */}
      {showAttach && (
        <div className="border-t border-surface-border bg-surface p-4">
          <div className="flex gap-4 justify-center">
            {[{icon:'photo_camera', label:'Camera', color:'text-red-400'},{icon:'image', label:'Gallery', color:'text-green-400'},{icon:'attach_file', label:'File', color:'text-blue-400'},{icon:'mic', label:'Voice', color:'text-purple-400'}].map(a => (
              <button key={a.label} onClick={() => setShowAttach(false)} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-surface-border flex items-center justify-center"><Icon name={a.icon} size={22} className={a.color} /></div>
                <span className="text-text-secondary text-[10px]">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 bg-bg-dark/95 backdrop-blur-xl border-t border-surface-border p-3 safe-bottom">
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowAttach(!showAttach); setShowCoins(false); }} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
            <Icon name={showAttach ? 'close' : 'add'} size={22} className="text-text-secondary" />
          </button>
          <div className="flex-1 relative">
            <input type="text" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="w-full bg-surface border border-surface-border rounded-full py-2.5 px-4 pr-10 text-sm text-white placeholder:text-text-secondary focus:border-primary focus:outline-none" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary"><Icon name="mood" size={20} /></button>
          </div>
          <button onClick={() => { setShowCoins(!showCoins); setShowAttach(false); }} className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
            <Icon name="monetization_on" size={20} className={showCoins ? 'text-primary' : 'text-text-secondary'} />
          </button>
          <button onClick={sendMessage} className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${input.trim() ? 'bg-primary text-black' : 'bg-surface text-text-secondary'}`}>
            <Icon name="send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
