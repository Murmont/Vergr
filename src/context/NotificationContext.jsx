import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { subscribeToNotifications, markNotificationRead, markAllNotificationsRead } from '../firebase/firestore';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!currentUser) { setNotifications([]); return; }
    const unsub = subscribeToNotifications(currentUser.uid, setNotifications);
    return unsub;
  }, [currentUser]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = async (id) => {
    await markNotificationRead(id);
  };

  const markAllRead = async () => {
    if (!currentUser) return;
    await markAllNotificationsRead(currentUser.uid);
  };

  const value = { notifications, unreadCount, markRead, markAllRead };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
