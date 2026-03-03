import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useUI } from '../../context/UIContext';
import { DEMO_QUESTS } from '../../utils/constants';
import TopBar from '../../components/TopBar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';

export default function EarnCoinsScreen() {
  const [quests, setQuests] = useState(DEMO_QUESTS);
  const [activeTab, setActiveTab] = useState('daily');
  const { profile, wallet } = useUser();
  const { showToast } = useUI();
  const navigate = useNavigate();

  const claimQuest = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.claimed) return;
    
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, claimed: true } : q));
    showToast(`+${quest.reward} coins earned!`, 'coins');
  };

  const filteredQuests = quests.filter(q => q.type === activeTab);
  const dailyEarned = quests.filter(q => q.type === 'daily' && q.completed).reduce((sum, q) => sum + q.reward, 0);

  const EARN_METHODS = [
    { icon: 'checklist', title: 'Daily Quests', desc: 'Complete tasks daily', reward: '10-50/day', color: 'text-brand-cyan' },
    { icon: 'live_tv', title: 'Watch Streams', desc: 'Watch for 10+ min', reward: '30/stream', color: 'text-brand-violet' },
    { icon: 'person_add', title: 'Refer Friends', desc: 'Share your invite code', reward: '500/referral', color: 'text-brand-pink' },
    { icon: 'brush', title: 'Create Content', desc: 'Post & get engagement', reward: 'Variable', color: 'text-brand-gold' },
    { icon: 'emoji_events', title: 'Win Tournaments', desc: 'Compete & win', reward: 'Prize pool', color: 'text-brand-ember' },
    { icon: 'groups', title: 'Squad Challenges', desc: 'Weekly squad goals', reward: '25-100', color: 'text-blue-400' },
  ];

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Earn Coins" showBack actions={<CoinDisplay amount={wallet?.balance || 0} />} />

      {/* Hero card */}
      <div className="mx-4 mt-2 p-5 rounded-2xl bg-card-gradient border border-border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-text-secondary text-sm mb-1">Today's Earnings</p>
          <div className="flex items-baseline gap-2">
            <CoinDisplay amount={dailyEarned} size="xl" />
            <span className="text-text-muted text-sm">/ 175 max</span>
          </div>
          <div className="w-full h-2 bg-surface-3 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gold-gradient rounded-full transition-all" style={{ width: `${Math.min((dailyEarned / 175) * 100, 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Ways to earn */}
      <div className="px-4 mt-6">
        <h3 className="font-syne font-bold text-lg mb-3">Ways to Earn</h3>
        <div className="grid grid-cols-2 gap-3">
          {EARN_METHODS.map((method, i) => (
            <div key={i} className="p-3 rounded-2xl border border-border-accent bg-surface-1">
              <Icon name={method.icon} filled size={24} className={method.color} />
              <p className="text-text-primary text-sm font-semibold mt-2">{method.title}</p>
              <p className="text-text-muted text-xs mt-0.5">{method.desc}</p>
              <p className="text-brand-gold text-xs font-dmmono mt-2">● {method.reward}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quests */}
      <div className="px-4 mt-6">
        <h3 className="font-syne font-bold text-lg mb-3">Active Quests</h3>
        <div className="flex gap-2 mb-4">
          {['daily', 'weekly', 'special'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredQuests.map(quest => (
            <div key={quest.id} className="flex items-center gap-3 p-4 rounded-2xl border border-border-accent bg-surface-1">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quest.completed ? 'bg-brand-cyan/10' : 'bg-surface-3'}`}>
                <Icon name={quest.completed ? 'check_circle' : 'radio_button_unchecked'} filled={quest.completed} size={22}
                  className={quest.completed ? 'text-brand-cyan' : 'text-text-muted'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary">{quest.title}</p>
                <p className="text-xs text-text-muted">{quest.description}</p>
                {!quest.completed && (
                  <div className="w-full h-1.5 bg-surface-3 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-brand-cyan rounded-full transition-all" style={{ width: `${(quest.progress / quest.target) * 100}%` }} />
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-brand-gold text-xs font-dmmono font-bold">● {quest.reward}</p>
                {quest.completed && !quest.claimed && (
                  <button onClick={() => claimQuest(quest.id)} className="mt-1 px-3 py-1 rounded-full bg-brand-gold text-bg-dark text-xs font-bold">
                    Claim
                  </button>
                )}
                {quest.claimed && <span className="text-brand-cyan text-xs">Claimed ✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
