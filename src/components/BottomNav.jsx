import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { useNotifications } from '../context/NotificationContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

const tabs = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/explore', icon: 'explore', label: 'Explore' },
  { path: '/messages', icon: 'chat_bubble', label: 'Chat' },
  { path: '/squads', icon: 'groups', label: 'Squads' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const handleTabClick = async (path) => {
    if (path === '/squads') {
      if (!auth.currentUser) return;
      
      // Smart redirect: If no squads, show onboarding welcome
      const q = query(
        collection(db, 'squads'), 
        where('memberIds', 'array-contains', auth.currentUser.uid)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        navigate('/onboarding/welcome');
      } else {
        navigate('/squads');
      }
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-bg-dark/95 backdrop-blur-2xl border-t border-white/5 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab.path)}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all duration-300 relative ${
                active ? 'text-brand-cyan' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon name={tab.icon} filled={active} size={active ? 24 : 22} />
                
                {tab.icon === 'home' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 bg-brand-ember rounded-full flex items-center justify-center text-[8px] font-black text-white px-1">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tighter transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-1 w-6 h-0.5 bg-brand-cyan rounded-full shadow-[0_0_10px_#00fff2]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}