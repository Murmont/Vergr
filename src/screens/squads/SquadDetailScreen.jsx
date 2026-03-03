import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';

const SQUAD_MESSAGES = [
  { id: 1, type: 'system', text: 'PlayerX joined the squad' },
  { id: 2, sender: 'GhostRunner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost', text: 'Check out my new setup 🔥', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400', time: '14:02' },
  { id: 3, type: 'tip', text: 'NeonBlade tipped GhostRunner 50 coins 🪙' },
  { id: 4, sender: 'NeonBlade', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', text: 'That setup is insane! We gaming tonight?', time: '14:05', isMe: true },
  { id: 5, sender: 'PixelQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', text: "I'm down! Tournament at 8PM right?", time: '14:08' },
  { id: 6, sender: 'FragMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', text: 'Yeah 8PM EST. Squad is locked in 💪', time: '14:10' },
];

export default function SquadDetailScreen() {
  const { squadId } = useParams();
  const [messages, setMessages] = useState(SQUAD_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(p => [...p, { id: Date.now(), sender: 'NeonBlade', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true }]);
    setInput('');
  };

  return (
    <div className="screen-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface-2 transition-colors">
              <Icon name="arrow_back" size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center">
                <Icon name="groups" size={22} className="text-white" />
              </div>
              <div>
                <h1 className="font-syne text-sm font-bold">Apex Predators</h1>
                <span className="font-dmmono text-[10px] text-green-500 uppercase">12 Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-surface-2"><Icon name="search" size={22} className="text-text-secondary" /></button>
            <button className="p-2 rounded-full hover:bg-surface-2"><Icon name="more_vert" size={22} className="text-text-secondary" /></button>
          </div>
        </div>
        {/* Pinned */}
        <div className="mx-4 mb-3 p-3 bg-surface-1 rounded-xl border border-border-accent/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Icon name="campaign" size={18} className="text-brand-cyan shrink-0" />
            <p className="text-xs text-text-secondary truncate">Pinned: Weekly raid schedule is live!</p>
          </div>
          <button className="text-[10px] font-bold uppercase text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded-lg shrink-0">View</button>
        </div>
      </header>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => {
          if (msg.type === 'system') return (
            <div key={msg.id} className="flex justify-center">
              <span className="text-[11px] text-text-muted font-dmmono bg-surface-2/50 px-3 py-1 rounded-full">{msg.text}</span>
            </div>
          );
          if (msg.type === 'tip') return (
            <div key={msg.id} className="flex justify-center">
              <span className="text-[11px] text-brand-gold font-dmmono bg-brand-gold/5 px-3 py-1.5 rounded-full border border-brand-gold/20">{msg.text}</span>
            </div>
          );
          return (
            <div key={msg.id} className={`flex items-start gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
              {!msg.isMe && <img src={msg.avatar} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />}
              <div className={`space-y-1 max-w-[75%] ${msg.isMe ? 'items-end' : ''}`}>
                {!msg.isMe && <span className="font-syne text-xs text-text-muted">{msg.sender}</span>}
                {msg.image && (
                  <div className="rounded-xl overflow-hidden border border-border-accent/30">
                    <img src={msg.image} alt="" className="w-full max-w-[280px] object-cover aspect-video rounded-xl" />
                  </div>
                )}
                {msg.text && (
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                    msg.isMe ? 'bg-brand-gradient text-white rounded-br-md' : 'bg-surface-2 text-text-primary border border-border-accent/30 rounded-bl-md'
                  }`}>{msg.text}</div>
                )}
                <span className="text-[10px] text-text-muted font-dmmono">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent/50 p-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center shrink-0">
            <Icon name="add" size={22} className="text-text-secondary" />
          </button>
          <input type="text" placeholder="Message squad..." value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 bg-surface-2 border border-border-accent rounded-full py-2.5 px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none" />
          <button onClick={send}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${input.trim() ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-muted'}`}>
            <Icon name="send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
