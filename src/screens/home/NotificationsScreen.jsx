import { useNotifications } from '../../context/NotificationContext';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';
import { timeAgo } from '../../utils/helpers';

const NOTIF_ICONS = {
  like: { icon: 'favorite', color: 'text-brand-ember', bg: 'bg-brand-ember/10' },
  follow: { icon: 'person_add', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  coins: { icon: 'paid', color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
  squad: { icon: 'groups', color: 'text-brand-violet', bg: 'bg-brand-violet/10' },
  comment: { icon: 'chat_bubble', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  stream: { icon: 'live_tv', color: 'text-brand-ember', bg: 'bg-brand-ember/10' },
  system: { icon: 'info', color: 'text-brand-violet', bg: 'bg-brand-violet/10' },
};

const EXTENDED_NOTIFS = [
  { id: 'n1', type: 'like', content: 'PixelQueen liked your post "Just dropped a 30-bomb"', read: false, createdAt: new Date(Date.now() - 300000) },
  { id: 'n2', type: 'follow', content: 'FragMaster started following you', read: false, createdAt: new Date(Date.now() - 900000) },
  { id: 'n3', type: 'coins', content: 'You earned 50 coins from daily quest!', read: false, createdAt: new Date(Date.now() - 3600000) },
  { id: 'n4', type: 'squad', content: 'Apex Predators squad challenge starts in 1 hour', read: true, createdAt: new Date(Date.now() - 7200000) },
  { id: 'n5', type: 'comment', content: 'LootGoblin replied to your post', read: true, createdAt: new Date(Date.now() - 10800000) },
  { id: 'n6', type: 'stream', content: 'PixelQueen just went live: "Elden Ring DLC"', read: true, createdAt: new Date(Date.now() - 14400000) },
  { id: 'n7', type: 'coins', content: 'You earned 100 coins from weekly quest!', read: true, createdAt: new Date(Date.now() - 86400000) },
  { id: 'n8', type: 'like', content: 'Shroud and 12 others liked your post', read: true, createdAt: new Date(Date.now() - 86400000 * 2) },
];

export default function NotificationsScreen() {
  const { markAllRead } = useNotifications();

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Notifications" showBack actions={
        <button onClick={markAllRead} className="text-brand-cyan text-sm font-semibold">Mark all read</button>
      } />

      <div className="divide-y divide-border-accent/30">
        {EXTENDED_NOTIFS.map(notif => {
          const style = NOTIF_ICONS[notif.type] || NOTIF_ICONS.system;
          return (
            <button key={notif.id}
              className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-surface-1/30 ${!notif.read ? 'bg-brand-cyan/[0.02]' : ''}`}>
              <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                <Icon name={style.icon} filled size={20} className={style.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${!notif.read ? 'text-text-primary font-medium' : 'text-text-secondary'}`}>
                  {notif.content}
                </p>
                <p className="text-text-muted text-xs mt-1 font-dmmono">{timeAgo(notif.createdAt)}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
