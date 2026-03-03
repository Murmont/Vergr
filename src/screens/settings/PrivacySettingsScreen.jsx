import { useState } from 'react';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

export default function PrivacySettingsScreen() {
  const [settings, setSettings] = useState({
    privateProfile: false, showOnlineStatus: true, allowDMs: true,
    showActivity: true, showLinkedAccounts: true, allowTagging: true,
  });

  const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }));

  const items = [
    { key: 'privateProfile', label: 'Private Profile', desc: 'Only approved followers can see your posts', icon: 'lock' },
    { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online', icon: 'circle' },
    { key: 'allowDMs', label: 'Allow Direct Messages', desc: 'Receive messages from anyone', icon: 'chat' },
    { key: 'showActivity', label: 'Show Activity Status', desc: 'Show what you\'re playing or streaming', icon: 'sports_esports' },
    { key: 'showLinkedAccounts', label: 'Show Linked Accounts', desc: 'Display Twitch, Discord, etc on profile', icon: 'link' },
    { key: 'allowTagging', label: 'Allow Tagging', desc: 'Let others tag you in posts', icon: 'sell' },
  ];

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Privacy & Security" showBack />
      <div className="px-4 py-4 space-y-3">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Icon name={item.icon} size={22} className="text-text-secondary shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-text-muted truncate">{item.desc}</p>
              </div>
            </div>
            <button onClick={() => toggle(item.key)}
              className={`w-12 h-7 rounded-full transition-colors shrink-0 ml-3 ${settings[item.key] ? 'bg-brand-cyan' : 'bg-surface-3'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}

        {/* Blocked users */}
        <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent mt-4">
          <div className="flex items-center gap-3">
            <Icon name="block" size={22} className="text-brand-ember" />
            <span className="text-sm font-semibold">Blocked Users</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-text-muted text-sm">3</span>
            <Icon name="chevron_right" size={18} className="text-text-muted" />
          </div>
        </button>

        {/* Data & account */}
        <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <div className="flex items-center gap-3">
            <Icon name="download" size={22} className="text-brand-violet" />
            <span className="text-sm font-semibold">Download My Data</span>
          </div>
          <Icon name="chevron_right" size={18} className="text-text-muted" />
        </button>

        <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-brand-ember/30 bg-brand-ember/5">
          <div className="flex items-center gap-3">
            <Icon name="delete_forever" size={22} className="text-brand-ember" />
            <span className="text-sm font-semibold text-brand-ember">Delete Account</span>
          </div>
          <Icon name="chevron_right" size={18} className="text-brand-ember" />
        </button>
      </div>
    </div>
  );
}
