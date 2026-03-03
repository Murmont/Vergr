import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

const STEPS = [
  { label: 'Order Placed', time: 'Mar 1, 2:30 PM', done: true },
  { label: 'Payment Confirmed', time: 'Mar 1, 2:31 PM', done: true },
  { label: 'Shipped', time: 'Mar 2, 10:15 AM', done: true },
  { label: 'Out for Delivery', time: 'Expected Mar 4', done: false },
  { label: 'Delivered', time: '', done: false },
];

export default function OrderTrackingScreen() {
  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Order Tracking" showBack />
      <div className="px-4 py-4">
        {/* Order ID */}
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-text-muted text-xs">Order ID</p>
              <p className="font-dmmono text-sm">#VGR-2024-0847</p>
            </div>
            <span className="badge-cyan">In Transit</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0 mb-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? 'bg-brand-cyan' : 'bg-surface-3 border border-border-accent'
                }`}>
                  {step.done ? <Icon name="check" size={16} className="text-bg-dark" /> : <div className="w-2 h-2 rounded-full bg-text-muted" />}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-0.5 h-12 ${step.done ? 'bg-brand-cyan' : 'bg-surface-3'}`} />
                )}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-semibold ${step.done ? 'text-text-primary' : 'text-text-muted'}`}>{step.label}</p>
                {step.time && <p className="text-xs text-text-muted font-dmmono mt-0.5">{step.time}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Item */}
        <h3 className="font-syne font-bold text-sm mb-3">Items</h3>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border-accent">
          <img src="https://images.unsplash.com/photo-1527814050087-3793815479db?w=100" alt="" className="w-14 h-14 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Velocity X Pro Mouse</p>
            <p className="text-text-muted text-xs">Qty: 1</p>
          </div>
          <span className="text-brand-cyan font-bold text-sm">€79.99</span>
        </div>
      </div>
    </div>
  );
}
