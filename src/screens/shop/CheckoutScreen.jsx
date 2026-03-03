import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

export default function CheckoutScreen() {
  const [payMethod, setPayMethod] = useState('card');
  const { showToast } = useUI();
  const navigate = useNavigate();

  const items = [
    { name: 'Velocity X Pro Mouse', price: 79.99, qty: 1, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=100' },
    { name: 'RGB Keyboard', price: 129.99, qty: 1, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100' },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleOrder = () => {
    showToast('Order placed successfully! 🎉', 'success');
    navigate('/order-success');
  };

  return (
    <div className="screen-container min-h-screen pb-28">
      <TopBar title="Checkout" showBack />
      <div className="px-4 py-4 space-y-6">
        {/* Items */}
        <div>
          <h3 className="font-syne font-bold text-sm mb-3">Order Summary</h3>
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border-accent mb-2">
              <img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.name}</p>
                <p className="text-text-muted text-xs">Qty: {item.qty}</p>
              </div>
              <span className="text-brand-cyan font-bold text-sm">€{item.price}</span>
            </div>
          ))}
        </div>

        {/* Shipping */}
        <div>
          <h3 className="font-syne font-bold text-sm mb-3">Shipping Address</h3>
          <button className="w-full p-4 rounded-2xl border border-dashed border-border-accent bg-surface-1 flex items-center justify-center gap-2 text-text-muted hover:border-brand-cyan/30 transition-colors">
            <Icon name="add_location" size={20} />
            <span className="text-sm">Add shipping address</span>
          </button>
        </div>

        {/* Payment */}
        <div>
          <h3 className="font-syne font-bold text-sm mb-3">Payment Method</h3>
          <div className="space-y-2">
            {[
              { id: 'card', label: 'Credit/Debit Card', icon: 'credit_card' },
              { id: 'coins', label: 'Pay with Coins (● 2,100)', icon: 'paid' },
              { id: 'paypal', label: 'PayPal', icon: 'account_balance' },
            ].map(m => (
              <button key={m.id} onClick={() => setPayMethod(m.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                  payMethod === m.id ? 'border-brand-cyan bg-brand-cyan/5' : 'border-border-accent bg-surface-1'
                }`}>
                <Icon name={m.icon} size={22} className={payMethod === m.id ? 'text-brand-cyan' : 'text-text-muted'} />
                <span className="text-sm font-medium">{m.label}</span>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  payMethod === m.id ? 'border-brand-cyan bg-brand-cyan' : 'border-border-accent'
                }`}>
                  {payMethod === m.id && <Icon name="check" size={12} className="text-bg-dark" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent space-y-2">
          <div className="flex justify-between text-sm"><span className="text-text-secondary">Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-text-secondary">Shipping</span><span>€{shipping.toFixed(2)}</span></div>
          <div className="border-t border-border-accent pt-2 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-brand-cyan text-lg">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Place order */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent p-4">
        <button onClick={handleOrder} className="btn-primary">
          Place Order — €{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
