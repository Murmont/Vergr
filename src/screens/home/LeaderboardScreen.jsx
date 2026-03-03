import { useState } from 'react';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

const LEADERBOARD = [
  { rank: 1, username: 'PixelQueen', displayName: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', points: 15280, tier: 'Diamond', isVerified: true },
  { rank: 2, username: 'Shroud', displayName: 'Shroud', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud', points: 12450, tier: 'Diamond', isVerified: true },
  { rank: 3, username: 'NeonBlade', displayName: 'Alex Storm', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', points: 11204, tier: 'Gold', isVerified: true, isYou: true },
  { rank: 4, username: 'FragMaster', displayName: 'Jake Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', points: 9870, tier: 'Silver' },
  { rank: 5, username: 'LootGoblin', displayName: 'Maya Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LootGoblin', points: 8920, tier: 'Platinum' },
  { rank: 6, username: 'ArcticWolf', displayName: 'Leo Frost', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArcticWolf', points: 7650, tier: 'Gold' },
  { rank: 7, username: 'VoidRunner', displayName: 'Zara Void', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VoidRunner', points: 6340, tier: 'Silver' },
  { rank: 8, username: 'BladeStorm', displayName: 'Kai Blade', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BladeStorm', points: 5890, tier: 'Gold' },
];

const PODIUM_COLORS = { 1: '#F5C542', 2: '#C0C0C0', 3: '#CD7F32' };

export default function LeaderboardScreen() {
  const [category, setCategory] = useState('Players');
  const [period, setPeriod] = useState('This Week');

  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Leaderboard" showBack />

      {/* Category tabs */}
      <div className="flex px-4 border-b border-border-accent/50">
        {['Players', 'Creators', 'Squads'].map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`relative flex-1 py-3 text-sm font-syne font-bold text-center transition-colors ${
              category === cat ? 'text-text-primary' : 'text-text-muted'
            }`}>
            {cat}
            {category === cat && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-brand-gradient rounded-full" />}
          </button>
        ))}
      </div>

      {/* Period tabs */}
      <div className="flex gap-2 px-4 mt-3">
        {['This Week', 'This Month', 'All Time'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-syne font-bold uppercase tracking-wider transition-all ${
              period === p ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-text-muted'
            }`}>
            {p}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-3 px-4 pt-12 pb-6 h-72">
        {/* 2nd */}
        <div className="flex flex-col items-center flex-1">
          <UserAvatar src={top3[1]?.avatar} size={48} tier={top3[1]?.tier} isVerified={top3[1]?.isVerified} />
          <div className="w-full mt-3 rounded-t-xl pt-4 pb-3 flex flex-col items-center h-24" style={{ background: `linear-gradient(to top, rgba(192,192,192,0.05), rgba(192,192,192,0.15))`, borderTop: '1px solid rgba(192,192,192,0.3)' }}>
            <span className="font-syne font-bold text-xs truncate w-16 text-center">{top3[1]?.username}</span>
            <span className="font-dmmono text-[10px] text-gray-400 mt-1">{top3[1]?.points.toLocaleString()} PTS</span>
          </div>
        </div>
        {/* 1st */}
        <div className="flex flex-col items-center flex-1 z-10">
          <div className="relative">
            <Icon name="workspace_premium" filled size={28} className="text-brand-gold absolute -top-7 left-1/2 -translate-x-1/2" />
            <UserAvatar src={top3[0]?.avatar} size={64} tier={top3[0]?.tier} isVerified={top3[0]?.isVerified} />
          </div>
          <div className="w-full mt-3 rounded-t-xl pt-4 pb-3 flex flex-col items-center h-32 scale-105 origin-bottom" style={{ background: `linear-gradient(to top, rgba(245,197,66,0.05), rgba(245,197,66,0.2))`, borderTop: '1px solid rgba(245,197,66,0.4)' }}>
            <span className="font-syne font-bold text-sm">{top3[0]?.username}</span>
            <span className="font-dmmono text-xs text-brand-gold mt-1">{top3[0]?.points.toLocaleString()} PTS</span>
            <span className="text-brand-gold text-lg mt-1">🏆</span>
          </div>
        </div>
        {/* 3rd */}
        <div className="flex flex-col items-center flex-1">
          <UserAvatar src={top3[2]?.avatar} size={48} tier={top3[2]?.tier} isVerified={top3[2]?.isVerified} />
          <div className="w-full mt-3 rounded-t-xl pt-4 pb-3 flex flex-col items-center h-20" style={{ background: `linear-gradient(to top, rgba(205,127,50,0.05), rgba(205,127,50,0.15))`, borderTop: '1px solid rgba(205,127,50,0.3)' }}>
            <span className="font-syne font-bold text-xs truncate w-16 text-center">{top3[2]?.username}</span>
            <span className="font-dmmono text-[10px] text-amber-600 mt-1">{top3[2]?.points.toLocaleString()} PTS</span>
          </div>
        </div>
      </div>

      {/* Rest of the list */}
      <div className="px-4 space-y-2">
        {rest.map(user => (
          <div key={user.rank} className={`flex items-center gap-3 p-3 rounded-2xl border ${user.isYou ? 'border-brand-cyan bg-brand-cyan/5' : 'border-border-accent bg-surface-1'}`}>
            <span className="font-dmmono text-text-muted text-sm w-6 text-center">#{user.rank}</span>
            <UserAvatar src={user.avatar} size={40} tier={user.tier} isVerified={user.isVerified} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm">{user.username}</span>
                {user.isYou && <span className="text-brand-cyan text-xs">(You)</span>}
              </div>
            </div>
            <span className="font-dmmono text-sm text-brand-gold font-bold">{user.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
