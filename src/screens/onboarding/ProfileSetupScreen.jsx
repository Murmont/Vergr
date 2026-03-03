import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

export default function ProfileSetupScreen() {
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen">
      <TopBar title="Set Up Profile" showBack />
      <div className="flex-1 px-4 pb-32">
        <div className="flex flex-col items-center mb-8 mt-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-surface-2 border-2 border-dashed border-border-accent flex items-center justify-center">
              <Icon name="add_a_photo" size={32} className="text-text-muted" />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center">
              <Icon name="edit" size={16} className="text-bg-dark" />
            </button>
          </div>
          <p className="text-text-secondary text-sm mt-3">Tap to upload avatar</p>
        </div>

        <div className="mb-6">
          <label className="text-text-secondary text-sm mb-2 block">Bio</label>
          <textarea
            value={bio} onChange={e => setBio(e.target.value)} maxLength={150}
            placeholder="Tell gamers about yourself..."
            className="w-full bg-surface-2 border border-border-accent rounded-2xl p-4 text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none transition-all h-28 resize-none text-sm"
          />
          <p className="text-text-muted text-xs text-right mt-1">{bio.length}/150</p>
        </div>

        <h3 className="text-text-primary font-semibold mb-3">Link Gaming Accounts</h3>
        <div className="space-y-3">
          {[
            { name: 'Twitch', icon: '📺', color: '#9146FF' },
            { name: 'Discord', icon: '💬', color: '#5865F2' },
            { name: 'YouTube', icon: '▶️', color: '#FF0000' },
            { name: 'Steam', icon: '🎮', color: '#1B2838' },
          ].map(platform => (
            <button key={platform.name}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border border-border-accent bg-surface-2 hover:border-text-muted transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{platform.icon}</span>
                <span className="text-text-primary text-sm font-medium">{platform.name}</span>
              </div>
              <span className="text-brand-cyan text-sm font-semibold">Connect</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent">
        <button onClick={() => navigate('/setup/follow-suggestions')} className="btn-primary">Continue</button>
        <button onClick={() => navigate('/setup/follow-suggestions')} className="w-full text-text-muted text-sm mt-3 text-center">Skip for now</button>
      </div>
    </div>
  );
}
