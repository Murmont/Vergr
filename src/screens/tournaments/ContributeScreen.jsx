import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function ContributeScreen() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const presets = [50,100,250,500];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Contribute</h1></header>
      <main className="flex-1 px-5 pb-8">
        <p className="text-text-secondary text-sm mb-6">Support your team's tournament entry. Every coin counts!</p>
        <div className="grid grid-cols-2 gap-3 mb-6">{presets.map(p=>(
          <button key={p} onClick={()=>setAmount(String(p))} className={`py-4 rounded-xl text-center font-bold ${String(p)===amount?'bg-primary text-black':'bg-surface text-white border border-surface-border'}`}>
            <div className="flex items-center justify-center gap-1"><Icon name="coins" size={16}/>{p}</div>
          </button>))}</div>
        <label className="block mb-6"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Custom Amount</span>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter coins..." className="w-full bg-surface border border-surface-border rounded-xl px-4 py-4 text-white text-xl font-bold outline-none focus:border-primary"/></label>
        <button onClick={()=>navigate('/contribution-success')} disabled={!amount} className={`w-full py-4 rounded-2xl text-lg font-bold ${amount?'btn-primary':'bg-surface text-text-secondary'}`}>Contribute {amount&&`${amount} Coins`}</button>
      </main>
    </div>);
}
