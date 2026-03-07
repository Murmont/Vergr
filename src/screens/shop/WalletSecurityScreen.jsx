import { useState } from 'react';
import Icon from '../../components/Icon';
import TopBar from '../../components/TopBar';

export default function WalletSecurityScreen() {
  const [settings, setSettings] = useState({
    pinLock: true,
    biometric: false,
    txAlerts: true,
    withdrawalConfirm: true
  });
  
  const toggle = k => setSettings(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <TopBar title="Wallet Security" showBack />
      
      <main className="flex-1 px-5 pb-8">
        {[
          { k: 'pinLock', icon: 'lock', label: 'PIN Lock', desc: 'Require PIN for transactions' },
          { k: 'biometric', icon: 'fingerprint', label: 'Biometric Auth', desc: 'Use fingerprint or face ID' },
          { k: 'txAlerts', icon: 'notifications', label: 'Transaction Alerts', desc: 'Get notified on every transaction' },
          { k: 'withdrawalConfirm', icon: 'shield', label: 'Withdrawal Confirmation', desc: 'Extra verification for payouts' }
        ].map(s => (
          <div key={s.k} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
            <Icon name={s.icon} size={20} className="text-primary" />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{s.label}</p>
              <p className="text-text-secondary text-xs">{s.desc}</p>
            </div>
            <button 
              onClick={() => toggle(s.k)} 
              className={`w-12 h-7 rounded-full relative transition-colors ${settings[s.k] ? 'bg-primary' : 'bg-surface-border'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${settings[s.k] ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}