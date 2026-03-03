import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSquads, getUserSquads } from '../../firebase/firestore';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

export default function SquadsScreen() {
  const [activeTab, setActiveTab] = useState('My Squads');
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl px-4 py-3 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h1 className="font-syne text-xl font-bold">Squads</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate('/messages')} className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center">
              <Icon name="chat" size={20} />
            </button>
            <button className="w-9 h-9 rounded-full bg-brand-cyan flex items-center justify-center">
              <Icon name="add" size={20} className="text-bg-dark" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {['My Squads', 'Discover', 'Events'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-4 space-y-3">
        {DEMO_SQUADS.map(squad => (
          <button key={squad.id} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border-accent bg-surface-1 hover:border-brand-cyan/30 transition-all text-left">
            <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center text-2xl">{squad.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary truncate">{squad.name}</span>
                {squad.isPrivate && <Icon name="lock" size={14} className="text-text-muted" />}
              </div>
              <p className="text-text-muted text-xs">{squad.game} · {squad.members} members</p>
            </div>
            <Icon name="chevron_right" size={20} className="text-text-muted" />
          </button>
        ))}

        {activeTab === 'Discover' && (
          <div className="text-center py-8">
            <Icon name="explore" size={48} className="text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary text-sm">Discover new squads to join</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
