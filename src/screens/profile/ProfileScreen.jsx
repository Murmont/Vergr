import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { getTier, getTierProgress, getNextTier, formatCoins } from '../../utils/helpers';
import UserAvatar from '../../components/UserAvatar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const PROFILE_TABS = ['Posts', 'Media', 'Likes', 'Shop'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const { profile, wallet } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  const tier = getTier(wallet?.totalSpent || 0);
  const tierProgress = getTierProgress(wallet?.totalSpent || 0);
  const nextTier = getNextTier(wallet?.totalSpent || 0);

  return (
    <div className="screen-container min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl flex items-center justify-between px-4 py-3 border-b border-white/5">
        <h1 className="font-syne text-lg font-bold">Profile</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/earn')} className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center">
            <Icon name="paid" size={20} className="text-brand-gold" />
          </button>
          <button onClick={() => navigate('/settings')} className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center">
            <Icon name="settings" size={20} />
          </button>
        </div>
      </header>

      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-brand-violet/30 via-brand-pink/20 to-brand-cyan/30 relative">
        <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Icon name="photo_camera" size={16} />
        </button>
      </div>

      {/* Avatar + Name */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="flex items-end justify-between">
          <UserAvatar src={profile.avatar} size={88} tier={wallet?.totalSpent || 0} isVerified={profile.isVerified} />
          <button onClick={() => navigate('/edit-profile')} className="px-4 py-2 rounded-full border border-border-accent text-sm font-semibold hover:bg-surface-2 transition-colors mb-1">
            Edit Profile
          </button>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h2 className="font-syne text-xl font-bold">{profile.displayName}</h2>
            {profile.isVerified && (
              <span className="w-5 h-5 rounded-full bg-brand-cyan flex items-center justify-center">
                <Icon name="check" size={12} className="text-bg-dark" />
              </span>
            )}
            {profile.isCreator && (
              <span className="badge-cyan text-[10px]">CREATOR</span>
            )}
          </div>
          <p className="text-text-secondary text-sm">@{profile.username}</p>
          {profile.bio && <p className="text-text-primary text-sm mt-2 leading-relaxed">{profile.bio}</p>}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <button className="text-center">
            <span className="text-text-primary font-bold font-dmmono">{formatCoins(profile.followers)}</span>
            <span className="text-text-muted text-xs ml-1">Followers</span>
          </button>
          <button className="text-center">
            <span className="text-text-primary font-bold font-dmmono">{formatCoins(profile.following)}</span>
            <span className="text-text-muted text-xs ml-1">Following</span>
          </button>
          <div className="text-center">
            <CoinDisplay amount={wallet?.balance || 0} size="sm" />
            <span className="text-text-muted text-xs ml-1">Coins</span>
          </div>
        </div>

        {/* Tier Card */}
        <div className="mt-4 p-4 rounded-2xl border border-border-accent bg-surface-1 relative overflow-hidden">
          {tier.holographic && (
            <div className="absolute inset-0 bg-holographic opacity-5 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          )}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="military_tech" filled size={20} style={{ color: tier.color }} />
                <span className="font-syne font-bold text-sm" style={{ color: tier.color }}>{tier.name}</span>
              </div>
              {nextTier && (
                <span className="text-text-muted text-xs font-dmmono">
                  {nextTier.min - wallet?.totalSpent || 0} coins to {nextTier.name}
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${tierProgress}%`, background: tier.holographic ? 'linear-gradient(90deg, #4DFFD4, #7B6FFF, #C87FFF, #F5C542)' : tier.color }} />
            </div>
          </div>
        </div>

        {/* Linked accounts */}
        {profile.linkedAccounts && (
          <div className="flex gap-2 mt-3">
            {profile.linkedAccounts.twitch && (
              <span className="badge bg-twitch/10 text-twitch text-[10px]">📺 Twitch</span>
            )}
            {profile.linkedAccounts.discord && (
              <span className="badge bg-discord/10 text-discord text-[10px]">💬 Discord</span>
            )}
            {profile.linkedAccounts.steam && (
              <span className="badge bg-gray-500/10 text-gray-400 text-[10px]">🎮 Steam</span>
            )}
          </div>
        )}
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b border-border-accent mt-4">
        {PROFILE_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors relative ${
              activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'
            }`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-brand-cyan rounded-full" />}
          </button>
        ))}
      </div>

      {/* Tab content placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <Icon name={activeTab === 'Posts' ? 'article' : activeTab === 'Media' ? 'photo_library' : activeTab === 'Likes' ? 'favorite' : 'storefront'} size={48} className="text-text-muted mb-3" />
        <p className="text-text-secondary text-sm text-center">No {activeTab.toLowerCase()} yet</p>
        {activeTab === 'Posts' && (
          <button onClick={() => navigate('/create-post')} className="mt-3 px-4 py-2 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold">
            Create your first post
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
