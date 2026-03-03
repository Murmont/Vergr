import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function RequestPayoutScreen() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Request Payout</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-surface rounded-xl p-4 border border-surface-border mb-6 text-center">
          <p className="text-text-secondary text-xs mb-1">Available Balance</p>
          <p className="text-primary text-3xl font-bold">4,250 <span className="text-lg">coins</span></p>
          <p className="text-text-secondary text-xs mt-1">≈ R977.50</p>
        </div>
        <label className="block mb-4"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Payout Amount (coins)</span>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Min 500" className="w-full bg-surface border border-surface-border rounded-xl px-4 py-4 text-white text-xl font-bold outline-none focus:border-primary"/></label>
        {amount&&<p className="text-text-secondary text-sm mb-4">≈ R{(Number(amount)*0.23).toFixed(2)}</p>}
        <div className="bg-surface/50 rounded-xl p-4 flex items-start gap-3 mb-6"><Icon name="info" size={16} className="text-primary mt-0.5 shrink-0"/><p className="text-text-secondary text-xs">Payouts are processed within 3-5 business days to your linked bank account.</p></div>
        <button onClick={()=>navigate('/payout-success')} disabled={!amount||Number(amount)<500} className={`w-full py-4 rounded-2xl text-lg font-bold ${amount&&Number(amount)>=500?'btn-primary':'bg-surface text-text-secondary'}`}>Request Payout</button>
      </main>
    </div>);
}
