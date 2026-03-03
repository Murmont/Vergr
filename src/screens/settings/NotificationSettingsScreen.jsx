import { useState } from 'react';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState({
    pushEnabled: true, likes: true, comments: true, follows: true,
    mentions: true, squadActivity: true, streamAlerts: true,
    tournamentUpdates: true, coinRewards: true, systemUpdates: true,
    emailDigest: false, quietHours: false,
  });

  const toggle = (k) => setSettings(p => ({ ...p, [k]: !p[k] }));

  const sections = [
    { title: 'Push Notifications', items: [
      { key: 'pushEnabled', label: 'Enable Push Notifications', desc: 'Master toggle for all push notifications', icon: 'notifications_active' },
    ]},
    { title: 'Social', items: [
      { key: 'likes', label: 'Likes', desc: 'When someone likes your post', icon: 'favorite' },
      { key: 'comments', label: 'Comments', desc: 'When someone comments on your post', icon: 'chat_bubble' },
      { key: 'follows', label: 'New Followers', desc: 'When someone follows you', icon: 'person_add' },
      { key: 'mentions', label: 'Mentions & Tags', desc: 'When someone mentions you', icon: 'alternate_email' },
    ]},
    { title: 'Gaming', items: [
      { key: 'squadActivity', label: 'Squad Activity', desc: 'Messages, events, and challenges', icon: 'groups' },
      { key: 'streamAlerts', label: 'Stream Alerts', desc: 'When followed creators go live', icon: 'live_tv' },
      { key: 'tournamentUpdates', label: 'Tournaments', desc: 'Match updates and results', icon: 'emoji_events' },
    ]},
    { title: 'Other', items: [
      { key: 'coinRewards', label: 'Coin Rewards', desc: 'Quest completions and earnings', icon: 'paid' },
      { key: 'systemUpdates', label: 'System Updates', desc: 'App updates and announcements', icon: 'info' },
      { key: 'emailDigest', label: 'Weekly Email Digest', desc: 'Summary of activity via email', icon: 'email' },
      { key: 'quietHours', label: 'Quiet Hours (10PM - 8AM)', desc: 'Mute notifications overnight', icon: 'do_not_disturb_on' },
    ]},
  ];

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Notifications" showBack />
      <div className="px-4 py-2">
        {sections.map(section => (
          <div key={section.title} className="mb-6">
            <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-3 px-1">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon name={item.icon} size={20} className="text-text-secondary shrink-0" />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
