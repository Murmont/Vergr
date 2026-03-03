import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person', label: 'Edit Profile', route: '/edit-profile' },
      { icon: 'lock', label: 'Privacy & Security', route: '/settings/privacy' },
      { icon: 'notifications', label: 'Notifications', route: '/settings/notifications' },
      { icon: 'link', label: 'Linked Accounts', route: '/settings/linked-accounts' },
    ],
  },
  {
    title: 'Earnings & Payments',
    items: [
      { icon: 'account_balance_wallet', label: 'Wallet', route: '/wallet' },
      { icon: 'paid', label: 'Earn Coins', route: '/earn' },
      { icon: 'payments', label: 'Payment Methods', route: '/settings/payments' },
    ],
  },
  {
    title: 'Creator Tools',
    items: [
      { icon: 'analytics', label: 'Creator Dashboard', route: '/creator/dashboard' },
      { icon: 'storefront', label: 'My Shop', route: '/creator/shop' },
      { icon: 'live_tv', label: 'Stream Settings', route: '/creator/stream' },
    ],
  },
  {
    title: 'App',
    items: [
      { icon: 'language', label: 'Language', route: '/settings/language' },
      { icon: 'palette', label: 'Display', route: '/settings/display' },
      { icon: 'help', label: 'Help & Support', route: '/settings/help' },
      { icon: 'info', label: 'About VERGR', route: '/settings/about' },
    ],
  },
];

export default function SettingsScreen() {
  const { logout } = useAuth();
  const { profile, wallet } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Settings" showBack />

      {/* Profile card */}
      <button onClick={() => navigate('/profile')} className="mx-4 mt-2 flex items-center gap-3 p-4 rounded-2xl border border-border-accent bg-surface-1">
        <UserAvatar src={profile?.avatar} size={52} tier={wallet?.totalSpent || 0} isVerified={profile?.isVerified} />
        <div className="flex-1 min-w-0 text-left">
          <p className="font-semibold text-text-primary truncate">{profile?.displayName}</p>
          <p className="text-text-muted text-sm">@{profile?.username}</p>
        </div>
        <Icon name="chevron_right" size={20} className="text-text-muted" />
      </button>

      {/* Settings sections */}
      {SETTINGS_SECTIONS.map(section => (
        <div key={section.title} className="mt-6 px-4">
          <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-2 px-1">{section.title}</h3>
          <div className="rounded-2xl border border-border-accent bg-surface-1 overflow-hidden">
            {section.items.map((item, i) => (
              <button key={item.label} onClick={() => navigate(item.route)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-2 transition-colors text-left ${
                  i > 0 ? 'border-t border-border-accent/50' : ''
                }`}>
                <Icon name={item.icon} size={22} className="text-text-secondary" />
                <span className="flex-1 text-sm text-text-primary">{item.label}</span>
                <Icon name="chevron_right" size={18} className="text-text-muted" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="px-4 mt-8 mb-6">
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-brand-ember/30 text-brand-ember hover:bg-brand-ember/5 transition-colors">
          <Icon name="logout" size={20} />
          <span className="font-semibold text-sm">Log Out</span>
        </button>
        <p className="text-text-muted text-xs text-center mt-4">VERGR v1.0.0</p>
      </div>
    </div>
  );
}
