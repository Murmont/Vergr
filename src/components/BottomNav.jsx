import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { useNotifications } from '../context/NotificationContext';

const tabs = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/explore', icon: 'explore', label: 'Explore' },
  { path: '/shop', icon: 'storefront', label: 'Shop' },
  { path: '/squads', icon: 'groups', label: 'Squads' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center w-16 h-full gap-0.5 transition-all duration-200 ${
                active ? 'text-brand-cyan' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <div className="relative">
                <Icon name={tab.icon} filled={active} size={active ? 26 : 24} />
                {tab.icon === 'home' && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-ember rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-brand-cyan' : ''}`}>
                {tab.label}
              </span>
              {active && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-brand-cyan rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
