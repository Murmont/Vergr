import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

const PRODUCT = {
  id: 'p1', name: 'Velocity X Pro Gaming Mouse', price: 79.99, coinPrice: 800,
  images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=600', 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600'],
  rating: 4.8, reviews: 234, seller: 'TechGear Pro', sellerVerified: true,
  description: 'Ultra-lightweight gaming mouse with 26K DPI sensor, 70-hour battery life, and customizable RGB. Built for competitive FPS gamers.',
  specs: ['Weight: 58g', 'Sensor: 26,000 DPI', 'Battery: 70 hours', 'Connection: USB-C / 2.4GHz', 'Switches: Optical'],
  stock: 42,
};

const REVIEWS = [
  { id: 'r1', user: 'FragMaster', rating: 5, text: 'Best mouse I\'ve ever used. The weight is perfect for flick shots.', date: '2 days ago' },
  { id: 'r2', user: 'ArcticWolf', rating: 4, text: 'Great sensor and build quality. Wish the scroll wheel was quieter.', date: '1 week ago' },
];

export default function ProductDetailScreen() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { showToast } = useUI();
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen pb-28">
      <TopBar showBack transparent actions={
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
            <Icon name="share" size={20} />
          </button>
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center relative">
            <Icon name="shopping_cart" size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-ember rounded-full text-[10px] font-bold flex items-center justify-center">2</span>
          </button>
        </div>
      } />

      {/* Image carousel */}
      <div className="relative h-72 bg-surface-1">
        <img src={PRODUCT.images[activeImage]} alt="" className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {PRODUCT.images.map((_, i) => (
            <button key={i} onClick={() => setActiveImage(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-brand-cyan w-6' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Title & price */}
        <div className="flex items-start justify-between mb-2">
          <h1 className="font-syne text-xl font-bold flex-1 pr-4">{PRODUCT.name}</h1>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-brand-cyan text-2xl font-bold">€{PRODUCT.price}</span>
          <span className="text-brand-gold font-dmmono text-sm">or ● {PRODUCT.coinPrice} coins</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Icon key={s} name="star" filled size={16} className={s <= Math.floor(PRODUCT.rating) ? 'text-brand-gold' : 'text-text-muted'} />
            ))}
          </div>
          <span className="text-sm text-text-secondary">{PRODUCT.rating} ({PRODUCT.reviews} reviews)</span>
        </div>

        {/* Seller */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-surface-1 border border-border-accent mb-4">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center">
            <Icon name="storefront" size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{PRODUCT.seller}</span>
              {PRODUCT.sellerVerified && <Icon name="verified" filled size={14} className="text-brand-cyan" />}
            </div>
          </div>
          <button className="text-brand-cyan text-xs font-semibold">Visit Shop</button>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-syne font-bold text-sm mb-2">Description</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{PRODUCT.description}</p>
        </div>

        {/* Specs */}
        <div className="mb-4">
          <h3 className="font-syne font-bold text-sm mb-2">Specifications</h3>
          <div className="space-y-2">
            {PRODUCT.specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon name="check_circle" filled size={14} className="text-brand-cyan shrink-0" />
                <span className="text-text-secondary text-sm">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-syne font-bold text-sm mb-3">Reviews</h3>
          {REVIEWS.map(review => (
            <div key={review.id} className="p-3 rounded-2xl bg-surface-1 border border-border-accent mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{review.user}</span>
                <span className="text-text-muted text-xs">{review.date}</span>
              </div>
              <div className="flex mb-1">
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name="star" filled size={12} className={s <= review.rating ? 'text-brand-gold' : 'text-text-muted'} />
                ))}
              </div>
              <p className="text-text-secondary text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buy bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-surface-2 rounded-full px-3">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-text-secondary">
            <Icon name="remove" size={18} />
          </button>
          <span className="font-dmmono text-sm w-6 text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-text-secondary">
            <Icon name="add" size={18} />
          </button>
        </div>
        <button onClick={() => showToast('Added to cart!', 'success')}
          className="flex-1 h-12 rounded-full bg-brand-gradient text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all">
          <Icon name="shopping_cart" size={18} /> Add to Cart — €{(PRODUCT.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
