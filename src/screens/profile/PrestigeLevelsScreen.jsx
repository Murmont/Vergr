import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Icon from '../../components/Icon';

const TIERS = [
  { name: 'Bronze', min: 0, color: '#CD7F32', perks: ['Basic profile', 'Join squads'] },
  { name: 'Silver', min: 500, color: '#C0C0C0', perks: ['Custom avatar ring', 'Create polls'] },
  { name: 'Gold', min: 2000, color: '#FFD700', perks: ['Gold badge', 'Priority matchmaking'] },
  { name: 'Platinum', min: 5000, color: '#E5E4E2', perks: ['Platinum effects', 'Creator tools access'] },
  { name: 'Diamond', min: 15000, color: '#B9F2FF', perks: ['Holographic avatar', 'Exclusive shop items'] },
];

export default function PrestigeLevelsScreen() {
  const navigate = useNavigate();
  const { wallet } = useUser();
  const totalSpent = wallet?.totalSpent || 0;

  // Find the current tier index based on real spending
  const currentTierIndex = TIERS.slice().reverse().findIndex(t => totalSpent >= t.min);
  const currentIndex = currentTierIndex === -1 ? 0 : (TIERS.length - 1 - currentTierIndex);

  return (
    <div className="screen-container min-h-screen">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-white/80"><Icon name="arrow_back" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Prestige Levels</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="mb-6 p-4 bg-brand-cyan/10 rounded-2xl border border-brand-cyan/20">
          <p className="text-text-secondary text-xs uppercase font-bold tracking-widest">Your Progress</p>
          <p className="text-text-primary text-lg font-bold">{totalSpent.toLocaleString()} Coins Spent</p>
        </div>

        {TIERS.map((t, i) => (
          <div key={t.name} className={`bg-surface-2 rounded-xl p-4 mb-3 border ${i === currentIndex ? 'border-brand-cyan ring-1 ring-brand-cyan/30' : 'border-border-accent'} ${i > currentIndex ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: t.color+'20'}}>
                <Icon name="military_tech" size={24} style={{color: t.color}}/>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{t.name}</h3>
                <p className="text-text-secondary text-xs">{t.min.toLocaleString()} coins to unlock</p>
              </div>
              {i < currentIndex && <span className="text-green-400 text-xs font-bold">Unlocked</span>}
              {i === currentIndex && <span className="text-brand-cyan text-xs font-bold">Current</span>}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {t.perks.map(p => <span key={p} className="text-[10px] bg-black/20 px-2 py-1 rounded text-text-muted">{p}</span>)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}