import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getTier, getTierProgress, getNextTier } from '../../utils/helpers';
import TopBar from '../../components/TopBar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';

const TRANSACTIONS = [
  { id: 't1', type: 'earned', desc: 'Daily Quest: Post Engagement', amount: 25, date: 'Today, 2:15 PM' },
  { id: 't2', type: 'earned', desc: 'Stream Watching Reward', amount: 30, date: 'Today, 11:00 AM' },
  { id: 't3', type: 'spent', desc: 'Tipped PixelQueen', amount: -50, date: 'Yesterday, 9:30 PM' },
  { id: 't4', type: 'earned', desc: 'Weekly Quest: Content Creator', amount: 100, date: 'Yesterday, 6:00 PM' },
  { id: 't5', type: 'purchased', desc: 'Gamer Pack Purchase', amount: 1200, date: '2 days ago' },
  { id: 't6', type: 'spent', desc: 'Tournament Entry Fee', amount: -100, date: '3 days ago' },
  { id: 't7', type: 'earned', desc: 'Referral Bonus: FragMaster', amount: 500, date: '5 days ago' },
];

const COIN_PACKS = [
  { id: 'pack1', name: 'Starter Pack', coins: 100, price: '€1.49', popular: false },
  { id: 'pack2', name: 'Gamer Bundle', coins: 500, price: '€6.49', popular: true, bonus: '+10% bonus' },
  { id: 'pack3', name: 'Pro Stack', coins: 1200, price: '€29.99', popular: false, bonus: '+20% bonus' },
];

export default function WalletScreen() {
  const [activeTab, setActiveTab] = useState('transactions');
  const { profile, wallet } = useUser();
  const navigate = useNavigate();

  const tier = getTier(wallet?.totalSpent || 0);
  const tierProgress = getTierProgress(wallet?.totalSpent || 0);
  const nextTier = getNextTier(wallet?.totalSpent || 0);

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Wallet" showBack />

      {/* Balance card */}
      <div className="mx-4 mt-2 p-6 rounded-3xl bg-card-gradient border border-border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-text-secondary text-sm mb-1">Your Balance</p>
          <CoinDisplay amount={wallet?.balance || 0} size="xl" />

          {/* Tier progress */}
          <div className="mt-4 flex items-center gap-2">
            <Icon name="military_tech" filled size={18} style={{ color: tier.color }} />
            <span className="text-sm font-semibold" style={{ color: tier.color }}>{tier.name}</span>
            {nextTier && <span className="text-text-muted text-xs ml-auto font-dmmono">{nextTier.min - (wallet?.totalSpent || 0)} to {nextTier.name}</span>}
          </div>
          <div className="w-full h-2 bg-surface-3 rounded-full mt-2 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${tierProgress}%`, background: tier.color }} />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 px-4 mt-4">
        <button onClick={() => setActiveTab('buy')} className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface-1 border border-border-accent hover:border-brand-gold/30 transition-colors">
          <Icon name="add_circle" filled size={24} className="text-brand-gold" />
          <span className="text-xs font-semibold">Buy Coins</span>
        </button>
        <button onClick={() => navigate('/earn')} className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface-1 border border-border-accent hover:border-brand-cyan/30 transition-colors">
          <Icon name="emoji_events" filled size={24} className="text-brand-cyan" />
          <span className="text-xs font-semibold">Earn</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface-1 border border-border-accent hover:border-brand-violet/30 transition-colors">
          <Icon name="send" filled size={24} className="text-brand-violet" />
          <span className="text-xs font-semibold">Send</span>
        </button>
        <button className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-surface-1 border border-border-accent hover:border-brand-pink/30 transition-colors">
          <Icon name="savings" filled size={24} className="text-brand-pink" />
          <span className="text-xs font-semibold">Cash Out</span>
        </button>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2 px-4 mt-6">
        <button onClick={() => setActiveTab('transactions')}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'transactions' ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'}`}>
          Transactions
        </button>
        <button onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'buy' ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'}`}>
          Buy Coins
        </button>
      </div>

      {/* Transactions */}
      {activeTab === 'transactions' && (
        <div className="px-4 mt-4 space-y-2">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border-accent">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                tx.type === 'earned' ? 'bg-green-500/10' : tx.type === 'purchased' ? 'bg-brand-gold/10' : 'bg-brand-ember/10'
              }`}>
                <Icon name={tx.type === 'earned' ? 'arrow_downward' : tx.type === 'purchased' ? 'shopping_cart' : 'arrow_upward'}
                  size={20} className={tx.type === 'earned' ? 'text-green-500' : tx.type === 'purchased' ? 'text-brand-gold' : 'text-brand-ember'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{tx.desc}</p>
                <p className="text-xs text-text-muted font-dmmono">{tx.date}</p>
              </div>
              <span className={`font-dmmono font-bold text-sm ${tx.amount > 0 ? 'text-green-500' : 'text-brand-ember'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} ●
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Buy Coins */}
      {activeTab === 'buy' && (
        <div className="px-4 mt-4 space-y-3">
          {COIN_PACKS.map(pack => (
            <div key={pack.id}
              className={`p-5 rounded-2xl border relative ${
                pack.popular ? 'border-brand-cyan bg-brand-cyan/5' : 'border-border-accent bg-surface-1'
              }`}>
              {pack.popular && (
                <span className="absolute -top-3 left-6 bg-brand-cyan text-bg-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{pack.name}</h3>
                  <p className="font-dmmono text-brand-gold text-sm">● {pack.coins.toLocaleString()} Coins</p>
                  {pack.bonus && <p className="text-green-500 text-xs mt-0.5">{pack.bonus}</p>}
                </div>
                <button className="px-6 py-2.5 rounded-full bg-brand-gradient text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg">
                  {pack.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
