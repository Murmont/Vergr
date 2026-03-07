import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const PROFILE_TABS = ['Posts', 'Media', 'Likes'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const { profile, loading } = useUser();
  const navigate = useNavigate();

  if (loading) return (
    <div className="screen-container min-h-screen flex items-center justify-center bg-bg-dark">
      <div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent animate-spin rounded-full"></div>
    </div>
  );

  // Prestige Logic - Defaulting to Level 1 if not set in Firestore
  const prestige = profile?.prestigeLevel || 1;
  const xp = profile?.xp || 0;
  const xpToNext = 1000; 
  const progress = Math.min((xp / xpToNext) * 100, 100);

  return (
    <div className="screen-container min-h-screen pb-20 bg-bg-dark">
      {/* Header with Hamburger Menu */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl flex items-center justify-between px-4 py-4 border-b border-white/5">
        <h1 className="font-syne text-lg font-bold text-white uppercase tracking-tighter italic">Persona</h1>
        <button 
          onClick={() => navigate('/settings')} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-2 border border-white/5 text-white active:scale-90 transition-transform"
        >
          <Icon name="menu" size={24} />
        </button>
      </header>

      <div className="px-5 pt-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <UserAvatar src={profile?.photoURL} size="xl" />
            {/* Prestige Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-brand-gradient px-2 py-0.5 rounded-lg border-2 border-bg-dark shadow-lg">
              <span className="text-[10px] font-black text-white italic">P.{prestige}</span>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold text-white leading-none">{profile?.followersCount || 0}</p>
              <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest mt-1.5">Fans</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white leading-none">{profile?.followingCount || 0}</p>
              <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest mt-1.5">Following</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white leading-none">{profile?.totalLikes || 0}</p>
              <p className="text-[9px] text-text-muted uppercase font-bold tracking-widest mt-1.5">Rep</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-syne font-bold text-white tracking-tight">{profile?.displayName}</h2>
            {profile?.isVerified && <Icon name="verified" size={18} className="text-brand-cyan" />}
          </div>
          <p className="text-brand-cyan text-sm font-dmmono">@{profile?.username}</p>
          
          {profile?.bio && (
            <p className="text-text-secondary text-sm mt-4 leading-relaxed max-w-[90%]">
              {profile.bio}
            </p>
          )}

          {/* Prestige Progress UI */}
          <div className="mt-6 p-4 bg-surface-2/50 rounded-2xl border border-white/5">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Prestige Progress</span>
              <span className="text-[11px] text-brand-cyan font-dmmono">{xp} / {xpToNext} XP</span>
            </div>
            <div className="h-1.5 w-full bg-bg-dark rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-brand-gradient transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/edit-profile')} 
          className="w-full py-3.5 rounded-2xl border border-border-accent bg-surface-2 text-white text-xs font-bold hover:bg-surface-3 active:scale-[0.98] transition-all tracking-widest uppercase"
        >
          Modify Persona
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 mt-8 px-2">
        {PROFILE_TABS.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
              activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-cyan shadow-[0_0_8px_rgba(0,255,242,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="py-20 flex flex-col items-center justify-center opacity-20">
        <Icon name="sensors" size={48} className="text-text-muted mb-4" />
        <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">Signal Lost: No Broadcasts</p>
      </div>

      <BottomNav />
    </div>
  );
}