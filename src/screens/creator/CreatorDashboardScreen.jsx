import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import TopBar from '../../components/TopBar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';

// Simple chart component since recharts may not be installed
const MiniChart = ({ data, color = '#4DFFD4', height = 60 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100 / (data.length - 1);

  const points = data.map((val, i) => {
    const x = i * width;
    const y = 100 - ((val - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#grad-${color.replace('#','')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

const ANALYTICS_DATA = {
  followers: [120, 145, 132, 178, 195, 210, 245],
  views: [1200, 1800, 1400, 2200, 2800, 2100, 3200],
  earnings: [45, 62, 38, 85, 72, 95, 110],
  engagement: [4.2, 5.1, 3.8, 6.4, 5.9, 7.2, 8.1],
};

export default function CreatorDashboardScreen() {
  const [period, setPeriod] = useState('7d');
  const { profile } = useUser();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Earnings', value: '45,280', icon: 'paid', color: 'text-brand-gold', bg: 'bg-brand-gold/10', prefix: '●' },
    { label: 'Followers', value: '12.4K', icon: 'group', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', change: '+2.4%' },
    { label: 'Post Views', value: '89.2K', icon: 'visibility', color: 'text-brand-violet', bg: 'bg-brand-violet/10', change: '+15.3%' },
    { label: 'Engagement', value: '8.1%', icon: 'trending_up', color: 'text-brand-pink', bg: 'bg-brand-pink/10', change: '+1.2%' },
  ];

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Creator Dashboard" showBack actions={
        <button className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center">
          <Icon name="settings" size={20} />
        </button>
      } />

      {/* Profile summary */}
      <div className="px-4 py-4 flex items-center gap-4">
        <img src={profile?.avatar} alt="" className="w-16 h-16 rounded-full border-2 border-brand-cyan object-cover" />
        <div>
          <h2 className="font-syne text-xl font-bold">{profile?.displayName}</h2>
          <span className="badge-cyan text-[10px] mt-1">CREATOR</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 w-max">
          <button onClick={() => navigate('/go-live')} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-ember/10 border border-brand-ember/30 text-brand-ember">
            <Icon name="radio_button_checked" filled size={16} /><span className="font-bold text-sm">Go Live</span>
          </button>
          <button onClick={() => navigate('/create-post')} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan">
            <Icon name="add" size={16} /><span className="font-bold text-sm">New Post</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold">
            <Icon name="shopping_bag" size={16} /><span className="font-bold text-sm">Add Product</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-violet/10 border border-brand-violet/30 text-brand-violet">
            <Icon name="auto_awesome" size={16} /><span className="font-bold text-sm">Manage Tiers</span>
          </button>
        </div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2 px-4 mt-6 mb-4">
        {['7d', '30d', '90d', 'All'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              period === p ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-muted'
            }`}>
            {p}
          </button>
        ))}
      </div>

      {/* Stats grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-text-muted uppercase tracking-wider">{stat.label}</p>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <Icon name={stat.icon} filled size={18} className={stat.color} />
              </div>
            </div>
            <p className={`font-dmmono text-xl font-bold ${stat.color}`}>
              {stat.prefix}{stat.value}
            </p>
            {stat.change && (
              <span className="text-green-500 text-xs font-dmmono font-medium">{stat.change}</span>
            )}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="px-4 mt-6 space-y-4">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-syne font-bold text-sm">Follower Growth</h3>
            <span className="text-green-500 text-xs font-dmmono">+2.4%</span>
          </div>
          <MiniChart data={ANALYTICS_DATA.followers} color="#4DFFD4" height={80} />
          <div className="flex justify-between mt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} className="text-[9px] text-text-muted font-dmmono">{d}</span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-syne font-bold text-sm">Earnings</h3>
            <span className="text-green-500 text-xs font-dmmono">+28.6%</span>
          </div>
          <MiniChart data={ANALYTICS_DATA.earnings} color="#F5C542" height={80} />
        </div>

        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-syne font-bold text-sm">Post Views</h3>
            <span className="text-green-500 text-xs font-dmmono">+15.3%</span>
          </div>
          <MiniChart data={ANALYTICS_DATA.views} color="#7B6FFF" height={80} />
        </div>
      </div>

      {/* Top performing content */}
      <div className="px-4 mt-6">
        <h3 className="font-syne font-bold text-lg mb-3">Top Performing Posts</h3>
        {[
          { title: 'Just dropped a 30-bomb in ranked 🔥', views: '24.5K', likes: 1284, type: 'text' },
          { title: 'New stream setup reveal', views: '89.2K', likes: 3420, type: 'image' },
          { title: 'Best game of 2024?', views: '45.1K', likes: 2100, type: 'poll' },
        ].map((post, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-border-accent bg-surface-1 mb-2">
            <span className="font-dmmono text-text-muted text-sm w-6 text-center">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary truncate">{post.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Icon name="visibility" size={12} /> {post.views}
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Icon name="favorite" size={12} /> {post.likes}
                </span>
              </div>
            </div>
            <span className="badge text-[10px] bg-surface-3 text-text-secondary">{post.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
