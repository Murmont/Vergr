import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
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

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { markAllRead } = useNotifications();

  useEffect(() => {
    if (!auth.currentUser) return;

    // Listen to real notifications for the logged-in user in vgrdb
    const q = query(
      collection(db, 'notifications'),
      where('recipientId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let notifData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));

      // Injects a System Welcome if no other notifications exist
      if (notifData.length === 0) {
        notifData = [{
          id: 'welcome-system',
          type: 'system',
          content: 'Welcome to Vergr! Start by following creators or posting your first clip.',
          read: false,
          createdAt: new Date() 
        }];
      }

      setNotifications(notifData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar 
        title="Notifications" 
        showBack 
        actions={
          <button onClick={markAllRead} className="text-brand-cyan text-sm font-semibold">
            Mark all read
          </button>
        } 
      />

      <div className="divide-y divide-border-accent/30">
        {loading ? (
          <div className="p-8 text-center text-text-muted">Loading...</div>
        ) : (
          notifications.map(notif => {
            const style = NOTIF_ICONS[notif.type] || NOTIF_ICONS.system;
            return (
              <button 
                key={notif.id}
                className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-surface-1/30 ${!notif.read ? 'bg-brand-cyan/[0.02]' : ''}`}
              >
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
          })
        )}
      </div>
    </div>
  );
}