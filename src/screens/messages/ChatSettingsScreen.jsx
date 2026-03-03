import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function ChatSettingsScreen() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);
  const isGroup = chatId === 'c2' || chatId === 'c4';
  const members = [
    { username: 'NeonBlade', tier: 'Gold', role: 'Admin' },
    { username: 'PixelQueen', tier: 'Diamond', role: 'Member' },
    { username: 'FragMaster', tier: 'Silver', role: 'Member' },
    { username: 'You', tier: 'Gold', role: 'Member' },
  ];

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24} /></button>
        <h1 className="text-white font-syne font-bold text-lg">{isGroup ? 'Group Info' : 'Chat Settings'}</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {/* Chat avatar + name */}
        <div className="flex flex-col items-center mb-6">
          {isGroup ? (
            <div className="w-20 h-20 rounded-2xl bg-surface-border flex items-center justify-center mb-3"><Icon name="groups" size={36} className="text-primary" /></div>
          ) : (
            <UserAvatar username="Alex Rivera" tier="Gold" size={80} />
          )}
          <h2 className="text-white text-xl font-bold mt-2">{isGroup ? 'Apex Predators Squad' : 'Alex Rivera'}</h2>
          {isGroup && <p className="text-text-secondary text-sm">{members.length} members</p>}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-6">
          {[
            { icon: 'search', label: 'Search' },
            { icon: muted ? 'notifications-off' : 'bell', label: muted ? 'Unmute' : 'Mute', action: () => setMuted(!muted) },
            ...(isGroup ? [{ icon: 'user-plus', label: 'Add', action: () => navigate(`/squads/${chatId}/invite`) }] : []),
          ].map(a => (
            <button key={a.label} onClick={a.action} className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 rounded-full bg-surface border border-surface-border flex items-center justify-center">
                <Icon name={a.icon} size={20} className="text-primary" />
              </div>
              <span className="text-text-secondary text-[10px]">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Members list (groups only) */}
        {isGroup && (
          <div className="mb-6">
            <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Members ({members.length})</p>
            {members.map(m => (
              <div key={m.username} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
                <UserAvatar username={m.username} tier={m.tier} size={40} />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{m.username === 'You' ? 'You' : `@${m.username}`}</p>
                  <p className="text-text-secondary text-xs">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {[
          { icon: 'image', label: 'Shared Media', path: `/messages/${chatId}/media` },
          { icon: 'link', label: 'Shared Links' },
          ...(isGroup ? [{ icon: 'edit', label: 'Edit Group Name' }] : []),
        ].map(s => (
          <button key={s.label} onClick={() => s.path && navigate(s.path)} className="flex items-center gap-3 w-full py-4 border-b border-surface-border/30">
            <Icon name={s.icon} size={20} className="text-primary" />
            <span className="flex-1 text-white text-sm font-semibold text-left">{s.label}</span>
            <Icon name="chevron-right" size={18} className="text-text-secondary" />
          </button>
        ))}

        {/* Danger zone */}
        <div className="mt-6 space-y-2">
          <button className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold text-sm">
            {isGroup ? 'Leave Group' : 'Block User'}
          </button>
          <button className="w-full py-3 rounded-xl text-red-400/60 font-semibold text-sm">
            {isGroup ? 'Report Group' : 'Report User'}
          </button>
        </div>
      </main>
    </div>
  );
}
