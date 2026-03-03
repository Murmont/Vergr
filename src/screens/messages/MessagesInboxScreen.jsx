import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

const DEMO_CONVERSATIONS = [
  { id: 'c1', name: 'Alex Rivera', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexR', lastMessage: "Can't wait to see the final design! Did you manage to fix the...", time: '11:42 AM', unread: true, online: true, isGroup: false },
  { id: 'c2', name: 'Vergr Core Team', avatars: ['https://api.dicebear.com/7.x/avataaars/svg?seed=TeamA', 'https://api.dicebear.com/7.x/avataaars/svg?seed=TeamB'], lastMessage: 'Maya: The new update looks 🔥', time: '10:15 AM', unread: false, online: false, isGroup: true, members: 5 },
  { id: 'c3', name: 'PixelQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', lastMessage: 'GG! That was insane 🎮', time: '9:30 AM', unread: true, online: true, isGroup: false, isVerified: true },
  { id: 'c4', name: 'Apex Predators Squad', avatars: ['https://api.dicebear.com/7.x/avataaars/svg?seed=Apex1', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Apex2'], lastMessage: 'Tournament starts at 8PM EST', time: 'Yesterday', unread: false, online: false, isGroup: true, members: 12 },
  { id: 'c5', name: 'FragMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', lastMessage: 'You: See you in ranked tonight!', time: 'Yesterday', unread: false, online: false, isGroup: false },
  { id: 'c6', name: 'VERGR System', avatar: null, lastMessage: 'Your verification has been approved! ✅', time: '2d ago', unread: true, online: false, isGroup: false, isSystem: true },
];

const TABS = ['All', 'Requests', 'Unread'];

export default function MessagesInboxScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const filtered = activeTab === 'Unread'
    ? DEMO_CONVERSATIONS.filter(c => c.unread)
    : DEMO_CONVERSATIONS;

  return (
    <div className="screen-container min-h-screen">
      <TopBar
        title="Messages"
        showBack
        actions={
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-2 transition-colors">
            <Icon name="edit_square" filled size={22} className="text-brand-cyan" onClick={() => navigate("/messages/new")} />
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex px-4 border-b border-border-accent/50">
        {TABS.map(tab => (
          <button key={tab} onClick={() => { if(tab === 'Requests') { navigate('/messages/requests'); return; } setActiveTab(tab); }}
            className={`relative flex-1 py-3.5 text-sm font-syne font-semibold text-center transition-colors ${
              activeTab === tab ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
            }`}>
            {tab}
            {tab === 'Unread' && <span className="ml-1 text-text-muted font-dmmono text-xs">({DEMO_CONVERSATIONS.filter(c => c.unread).length})</span>}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gradient rounded-full" />}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <label className="block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Icon name="search" size={20} />
          </div>
          <input type="text" placeholder="Search messages..."
            className="w-full bg-surface-2 border border-border-accent rounded-full py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none transition-all" />
        </label>
      </div>

      {/* Conversation List */}
      <div className="flex-1">
        {filtered.map(conv => (
          <button key={conv.id} onClick={() => navigate(`/messages/${conv.id}`)}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-surface-1/30 transition-colors border-b border-border-accent/20 text-left">
            {/* Avatar */}
            <div className="relative shrink-0">
              {conv.isSystem ? (
                <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center">
                  <Icon name="smart_toy" size={24} className="text-white" />
                </div>
              ) : conv.isGroup ? (
                <div className="relative w-12 h-12">
                  <img src={conv.avatars[0]} alt="" className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-bg-dark z-10 object-cover" />
                  <img src={conv.avatars[1]} alt="" className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-bg-dark object-cover" />
                </div>
              ) : (
                <UserAvatar src={conv.avatar} size={48} isVerified={conv.isVerified} showTierRing={false} />
              )}
              {conv.online && !conv.isGroup && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-dark rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className={`font-syne font-semibold text-sm truncate ${conv.unread ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {conv.name}
                </h3>
                <span className={`font-dmmono text-[10px] uppercase shrink-0 ml-2 ${conv.unread ? 'text-brand-cyan' : 'text-text-muted'}`}>
                  {conv.time}
                </span>
              </div>
              <p className={`text-sm line-clamp-1 ${conv.unread ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
                {conv.lastMessage}
              </p>
            </div>

            {/* Unread dot */}
            {conv.unread && (
              <div className="shrink-0">
                <div className="w-2.5 h-2.5 bg-brand-cyan rounded-full shadow-[0_0_8px_rgba(77,255,212,0.4)]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
