import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function OrderSuccessScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6 animate-bounce-slow">
        <Icon name="check_circle" filled size={56} className="text-brand-cyan" />
      </div>
      <h1 className="font-syne text-2xl font-bold mb-2">Order Placed!</h1>
      <p className="text-text-secondary text-sm mb-2">Your order #VGR-2024-0847 has been confirmed</p>
      <p className="text-text-muted text-xs mb-8">You'll receive a notification when it ships</p>

      <div className="w-full space-y-3">
        <button onClick={() => navigate('/order-tracking')} className="btn-primary">
          Track Order
        </button>
        <button onClick={() => navigate('/shop')} className="w-full py-3.5 rounded-full border border-border-accent text-text-secondary font-semibold text-sm hover:bg-surface-2 transition-colors">
          Continue Shopping
        </button>
        <button onClick={() => navigate('/')} className="w-full text-text-muted text-sm">
          Back to Home
        </button>
      </div>
    </div>
  );
}
