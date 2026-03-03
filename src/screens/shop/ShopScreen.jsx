import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const SHOP_CATEGORIES = ['All', 'Peripherals', 'Merch', 'Digital', 'Collectibles'];

const DEMO_PRODUCTS = [
  { id: 'p1', name: 'Velocity X Gaming Mouse', price: 79.99, coinPrice: 800, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400', rating: 4.8, reviews: 234, seller: 'TechGear Pro' },
  { id: 'p2', name: 'RGB Mechanical Keyboard', price: 129.99, coinPrice: 1300, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', rating: 4.9, reviews: 567, seller: 'KeyCraft' },
  { id: 'p3', name: 'Pro Gamer Hoodie', price: 49.99, coinPrice: 500, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', rating: 4.5, reviews: 89, seller: 'VERGR Official' },
  { id: 'p4', name: 'Diamond Apex Badge (NFT)', price: 9.99, coinPrice: 100, image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400', rating: 4.7, reviews: 42, seller: 'VERGR Digital' },
];

export default function ShopScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { profile, wallet } = useUser();
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl px-4 py-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-syne text-xl font-bold">Shop</h1>
          <div className="flex items-center gap-2">
            <CoinDisplay amount={wallet?.balance || 0} size="sm" />
            <button className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center relative">
              <Icon name="shopping_cart" size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-ember rounded-full text-[10px] font-bold flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* Wallet strip */}
        <button onClick={() => navigate('/wallet')} className="w-full flex items-center justify-between p-3 rounded-2xl bg-card-gradient border border-border-accent mb-3">
          <div className="flex items-center gap-2">
            <Icon name="account_balance_wallet" size={20} className="text-brand-gold" />
            <span className="text-sm text-text-secondary">Wallet Balance</span>
          </div>
          <div className="flex items-center gap-2">
            <CoinDisplay amount={wallet?.balance || 0} />
            <Icon name="chevron_right" size={18} className="text-text-muted" />
          </div>
        </button>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {SHOP_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {DEMO_PRODUCTS.map(product => (
          <button key={product.id} className="rounded-2xl border border-border-accent bg-surface-1 overflow-hidden text-left hover:border-brand-cyan/30 transition-all">
            <img src={product.image} alt={product.name} className="w-full h-36 object-cover" loading="lazy" />
            <div className="p-3">
              <p className="text-text-primary text-sm font-semibold leading-snug line-clamp-2 mb-1">{product.name}</p>
              <p className="text-text-muted text-xs mb-2">{product.seller}</p>
              <div className="flex items-center gap-1 mb-2">
                <Icon name="star" filled size={14} className="text-brand-gold" />
                <span className="text-xs text-text-secondary">{product.rating} ({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-cyan font-bold text-sm">€{product.price}</span>
                <span className="text-brand-gold text-xs font-dmmono">● {product.coinPrice}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
