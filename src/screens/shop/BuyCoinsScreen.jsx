import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

export default function BuyCoinsScreen() {
  const navigate = useNavigate();
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPack, setSelectedPack] = useState(null);
  
  const packs = [
    { id: 1, coins: 100, price: '€0.99', bonus: null },
    { id: 2, coins: 500, price: '€4.49', bonus: '+10%' },
    { id: 3, coins: 1200, price: '€8.99', bonus: '+20%' },
    { id: 4, coins: 5000, price: '€19.99', bonus: '+30%' }
  ];

  // 1 coin = €0.01
  const customPrice = (parseInt(customAmount || 0) * 0.01).toFixed(2);

  const handlePackSelect = (pack) => {
    setSelectedPack(pack.id);
    setCustomAmount(''); // Clear custom when pack is selected
  };

  const handleCustomChange = (val) => {
    setCustomAmount(val);
    setSelectedPack(null); // Clear pack selection when typing custom
  };

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <TopBar title="Buy Coins" showBack />
      
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {/* Coin Packs */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {packs.map(p => (
            <button 
              key={p.id} 
              onClick={() => handlePackSelect(p)} 
              className={`bg-surface-1 rounded-2xl p-4 border transition-all ${
                selectedPack === p.id ? 'border-primary ring-1 ring-primary' : 'border-border-accent'
              }`}
            >
              <p className="text-white text-lg font-bold">{p.coins.toLocaleString()}</p>
              <p className="text-primary font-bold text-sm">{p.price}</p>
              {p.bonus && <span className="text-green-500 text-xs font-bold">{p.bonus}</span>}
            </button>
          ))}
        </div>

        {/* Custom Amount Section */}
        <div className="bg-surface-1 rounded-2xl p-5 border border-border-accent">
          <p className="text-text-secondary text-xs font-bold uppercase mb-3">Custom Amount</p>
          <div className="flex items-center gap-3">
            <Icon name="coins" size={24} className="text-brand-gold" />
            <input 
              type="number" 
              value={customAmount} 
              onChange={e => handleCustomChange(e.target.value)} 
              placeholder="Enter amount (e.g. 500)" 
              className="flex-1 bg-transparent text-white text-xl font-bold outline-none"
            />
          </div>
          {customAmount > 0 && (
            <div className="mt-4 pt-3 border-t border-border-accent flex justify-between items-center">
               <p className="text-text-secondary text-sm">Estimated Total</p>
               <p className="text-white font-bold text-lg">€{customPrice}</p>
            </div>
          )}
        </div>

        <button 
          disabled={!selectedPack && (!customAmount || customAmount <= 0)}
          className="w-full py-4 mt-6 rounded-2xl bg-primary text-black font-bold text-lg hover:brightness-110 disabled:opacity-50 disabled:grayscale transition-all"
        >
          Proceed to Payment
        </button>
      </main>
    </div>
  );
}