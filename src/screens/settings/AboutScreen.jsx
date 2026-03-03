import TopBar from '../../components/TopBar';
import VergrLogo from '../../components/VergrLogo';
import Icon from '../../components/Icon';

export default function AboutScreen() {
  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="About VERGR" showBack />
      <div className="px-4 py-8 flex flex-col items-center">
        <VergrLogo size="lg" showText />
        <p className="text-text-muted text-sm mt-2 font-dmmono">v1.0.0</p>
        <p className="text-text-secondary text-center text-sm mt-4 leading-relaxed max-w-xs">
          Where Gamers Converge. Compete, create, earn, and shop in the ultimate gaming social platform.
        </p>

        <div className="w-full mt-8 space-y-2">
          {[
            { icon: 'description', label: 'Terms of Service' },
            { icon: 'privacy_tip', label: 'Privacy Policy' },
            { icon: 'gavel', label: 'Community Guidelines' },
            { icon: 'code', label: 'Open Source Licenses' },
            { icon: 'help', label: 'Help Center' },
            { icon: 'email', label: 'Contact Us' },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent hover:bg-surface-2 transition-colors">
              <div className="flex items-center gap-3">
                <Icon name={item.icon} size={20} className="text-text-secondary" />
                <span className="text-sm">{item.label}</span>
              </div>
              <Icon name="chevron_right" size={18} className="text-text-muted" />
            </button>
          ))}
        </div>

        <p className="text-text-muted text-xs mt-8 text-center">© 2024 VERGR. All rights reserved.</p>
      </div>
    </div>
  );
}
