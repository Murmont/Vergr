import { useState } from 'react';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

const ACCOUNTS = [
  { id: 'twitch', name: 'Twitch', icon: '📺', color: '#9146FF', connected: true, username: 'NeonBlade_TV' },
  { id: 'discord', name: 'Discord', icon: '💬', color: '#5865F2', connected: true, username: 'NeonBlade#1337' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', color: '#FF0000', connected: false },
  { id: 'steam', name: 'Steam', icon: '🎮', color: '#1B2838', connected: true, username: 'neonblade' },
  { id: 'kick', name: 'Kick', icon: '🟢', color: '#53FC18', connected: false },
  { id: 'xbox', name: 'Xbox', icon: '🟩', color: '#107C10', connected: false },
  { id: 'playstation', name: 'PlayStation', icon: '🎮', color: '#003087', connected: false },
  { id: 'epicgames', name: 'Epic Games', icon: '🎯', color: '#313131', connected: false },
  { id: 'riotgames', name: 'Riot Games', icon: '⚔️', color: '#D32936', connected: false },
];

export default function LinkedAccountsScreen() {
  const [accounts, setAccounts] = useState(ACCOUNTS);
  const { showToast } = useUI();

  const toggleConnection = (id) => {
    setAccounts(prev => prev.map(a => {
      if (a.id !== id) return a;
      if (a.connected) {
        showToast(`${a.name} disconnected`, 'info');
        return { ...a, connected: false, username: undefined };
      }
      showToast(`${a.name} connected!`, 'success');
      return { ...a, connected: true, username: 'connected_user' };
    }));
  };

  const connected = accounts.filter(a => a.connected);
  const available = accounts.filter(a => !a.connected);

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Linked Accounts" showBack />
      <div className="px-4 py-4">
        <p className="text-text-secondary text-sm mb-6">Connect your gaming accounts to display on your profile and enable multi-platform streaming.</p>

        {connected.length > 0 && (
          <>
            <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-3">Connected</h3>
            <div className="space-y-2 mb-6">
              {connected.map(acc => (
                <div key={acc.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{acc.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{acc.name}</p>
                      <p className="text-xs text-green-500">{acc.username}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleConnection(acc.id)}
                    className="px-3 py-1.5 rounded-full border border-brand-ember/30 text-brand-ember text-xs font-semibold hover:bg-brand-ember/5 transition-colors">
                    Disconnect
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <h3 className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-3">Available</h3>
        <div className="space-y-2">
          {available.map(acc => (
            <div key={acc.id} className="flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
              <div className="flex items-center gap-3">
                <span className="text-xl">{acc.icon}</span>
                <p className="text-sm font-semibold">{acc.name}</p>
              </div>
              <button onClick={() => toggleConnection(acc.id)}
                className="px-4 py-1.5 rounded-full bg-brand-cyan text-bg-dark text-xs font-bold hover:brightness-110 transition-all">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
