import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import CreatePollModal from '../../components/CreatePollModal'; 

export default function SquadDetailScreen({ isAdmin }) {
  const { squadId } = useParams();
  const [messages, setMessages] = useState([]); // Start with empty state for production
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('Chat'); 
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { 
    if (activeTab === 'Chat') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }
  }, [messages, activeTab]);

  const send = async () => {
    if (!input.trim()) return;
    
    // TODO: Replace with your Firestore addDoc logic
    console.log("Sending message to squad:", squadId, input);
    
    setInput('');
  };

  const handleCreatePoll = async (pollData) => {
    // TODO: Replace with your Firestore addDoc logic for polls
    console.log("Creating poll in Firestore for squad:", squadId, pollData);
    setIsPollModalOpen(false);
  };

  return (
    <div className="screen-container min-h-screen flex flex-col bg-bg-dark relative">
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
                <h1 className="font-syne text-sm font-bold">Squad Chat</h1>
                <span className="font-dmmono text-[10px] text-brand-cyan uppercase tracking-tighter">Live Connection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex px-4 border-b border-border-accent">
          {['Chat', 'Matches', 'Members'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Chat' && (
          <div className="p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Icon name="forum" size={48} className="text-surface-3 mb-4" />
                <p className="text-text-muted text-sm">No messages yet.<br/>Start the conversation!</p>
              </div>
            )}
            
            {messages.map(msg => (
              <div key={msg.id} className={`flex items-start gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm ${
                  msg.isMe ? 'bg-brand-gradient text-white rounded-br-md' : 'bg-surface-2 text-text-primary border border-border-accent/30 rounded-bl-md'
                }`}>{msg.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {activeTab !== 'Chat' && (
          <div className="p-4 text-center py-10">
            <p className="text-text-muted text-sm">{activeTab} coming soon.</p>
          </div>
        )}
      </div>

      {activeTab === 'Chat' && (
        <div className="sticky bottom-0 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent/50 p-3">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Message squad..." 
              value={input} 
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              className="flex-1 bg-surface-2 border border-border-accent rounded-full py-2.5 px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none" 
            />
            <button onClick={send} className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${input.trim() ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-muted'}`}>
              <Icon name="send" size={20} />
            </button>
          </div>
        </div>
      )}

      {isAdmin && (
        <>
          {showAdminMenu && (
            <div className="absolute bottom-20 right-4 z-50 w-48 bg-surface-2 border border-border-accent rounded-2xl shadow-xl p-1 animate-in fade-in zoom-in-95">
              <button 
                onClick={() => { setShowAdminMenu(false); setIsPollModalOpen(true); }} 
                className="w-full text-left px-4 py-3 text-sm hover:bg-surface-3 rounded-xl flex items-center gap-2 text-white"
              >
                <Icon name="poll" size={16} /> Create Poll
              </button>
            </div>
          )}
          <button 
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-brand-cyan rounded-full flex items-center justify-center shadow-lg z-50 text-bg-dark"
          >
            <Icon name={showAdminMenu ? "close" : "add"} size={28} />
          </button>
        </>
      )}

      {isPollModalOpen && (
        <CreatePollModal 
          onClose={() => setIsPollModalOpen(false)} 
          onConfirm={handleCreatePoll}
        />
      )}
    </div>
  );
}