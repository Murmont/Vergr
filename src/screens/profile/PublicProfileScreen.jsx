import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTier, getTierProgress, formatCoins } from '../../utils/helpers';
import UserAvatar from '../../components/UserAvatar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';

const USER_DATA = {
  uid: 'user-002', username: 'PixelQueen', displayName: 'Sarah Chen',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen',
  bio: '⚡ Variety streamer | Esports commentator | Cat mom\nLeveling up the arena one stream at a time.',
  coins: 8500, coinsSpent: 2200, followers: 38000, following: 520,
  isCreator: true, isVerified: true, isLive: true,
  posts: 128, linkedAccounts: { twitch: 'PixelQueen_TV', youtube: 'PixelQueen' },
};

export default function PublicProfileScreen() {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Posts');
  const navigate = useNavigate();
  const user = USER_DATA;
  const tier = getTier(user.coinsSpent);

  return (
    <div className="screen-container min-h-screen pb-8">
      {/* Header overlay */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 max-w-[480px] mx-auto">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
          <Icon name="arrow_back" size={20} />
        </button>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
          <Icon name="more_vert" size={20} />
        </button>
      </header>

      {/* Banner */}
      <div className="relative w-full h-44 bg-gradient-to-br from-brand-violet/40 via-brand-pink/30 to-brand-cyan/40">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent" />
        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="relative">
            <div className={`rounded-full p-[3px] ${tier.holographic ? 'holographic-ring' : ''}`}
              style={!tier.holographic ? { background: `linear-gradient(135deg, ${tier.color}, ${tier.color}88)` } : {}}>
              <div className="rounded-full bg-bg-dark p-1">
                <img src={user.avatar} alt="" className="w-20 h-20 rounded-full object-cover" />
              </div>
            </div>
            {user.isLive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-brand-ember px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase border-2 border-bg-dark">LIVE</div>
            )}
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="mt-14 px-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-syne text-2xl font-bold">{user.displayName}</h1>
          {user.isVerified && (
            <span className="w-5 h-5 rounded-full bg-brand-cyan flex items-center justify-center">
              <Icon name="check" size={13} className="text-bg-dark" />
            </span>
          )}
          {user.isLive && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-ember/10 border border-brand-ember/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-ember animate-pulse" />
              <span className="text-[10px] font-bold text-brand-ember uppercase">LIVE</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="font-dmmono text-sm text-brand-cyan/80">@{user.username}</span>
          {user.isCreator && <span className="badge bg-brand-violet/20 text-brand-violet text-[10px] border border-brand-violet/30">Creator</span>}
          <span className="badge text-[10px]" style={{ background: `${tier.color}15`, color: tier.color, borderColor: `${tier.color}30` }}>
            {tier.name}
          </span>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line mb-4">{user.bio}</p>

        {/* Stats */}
        <div className="flex gap-8 mb-4">
          <div><span className="font-dmmono text-lg font-bold">{user.posts}</span><span className="text-text-muted text-[11px] uppercase tracking-wider ml-1.5">Posts</span></div>
          <button><span className="font-dmmono text-lg font-bold text-brand-cyan">{formatCoins(user.followers)}</span><span className="text-text-muted text-[11px] uppercase tracking-wider ml-1.5">Followers</span></button>
          <div><span className="font-dmmono text-lg font-bold">{user.following}</span><span className="text-text-muted text-[11px] uppercase tracking-wider ml-1.5">Following</span></div>
        </div>

        {/* Linked accounts */}
        <div className="flex gap-2 mb-6">
          {user.linkedAccounts.twitch && <span className="badge bg-twitch/10 text-twitch text-[10px]">📺 Twitch</span>}
          {user.linkedAccounts.youtube && <span className="badge bg-youtube/10 text-youtube text-[10px]">▶️ YouTube</span>}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 h-11 rounded-full font-bold text-sm transition-all ${
              isFollowing ? 'bg-surface-2 border border-border-accent text-text-secondary' : 'bg-brand-gradient text-white shadow-[0_0_20px_rgba(77,255,212,0.15)]'
            }`}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button onClick={() => navigate('/messages/new')} className="h-11 px-5 rounded-full border border-border-accent bg-surface-2 text-text-primary font-semibold text-sm">
            Message
          </button>
          <button className="h-11 w-11 rounded-full border border-border-accent bg-surface-2 flex items-center justify-center">
            <Icon name="paid" size={20} className="text-brand-gold" />
          </button>
        </div>
      </div>

      {/* Profile tabs */}
      <div className="flex border-b border-border-accent mt-6">
        {['Posts', 'Media', 'Streams', 'Shop'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center relative transition-colors ${activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-brand-cyan rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <Icon name="article" size={48} className="text-text-muted mb-3" />
        <p className="text-text-secondary text-sm">Content loading...</p>
      </div>
    </div>
  );
}
