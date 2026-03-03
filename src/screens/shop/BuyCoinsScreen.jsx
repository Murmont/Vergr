import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function BuyCoinsScreen() {
  const navigate = useNavigate();
  const [custom, setCustom] = useState('');
  const [selected, setSelected] = useState(null);
  const packs = [{id:1,coins:100,price:'€0.99',bonus:null},{id:2,coins:500,price:'€4.49',bonus:'+10%'},{id:3,coins:1200,price:'€8.99',bonus:'+20%'},{id:4,coins:5000,price:'€19.99',bonus:'+30%'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Buy Coins</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 mb-6">{packs.map(p=>(
          <button key={p.id} onClick={()=>{setSelected(p.id);setCustom('');}} className={`bg-surface rounded-xl p-4 border text-center ${selected===p.id?'border-primary ring-1 ring-primary/40':'border-surface-border'}`}>
            <div className="flex items-center justify-center gap-1 mb-2"><Icon name="coins" size={18} className="text-primary"/><span className="text-white text-xl font-bold">{p.coins.toLocaleString()}</span></div>
            <p className="text-primary font-bold">{p.price}</p>
            {p.bonus&&<span className="text-green-400 text-xs font-bold">{p.bonus} bonus</span>}
          </button>))}</div>
        <div className="bg-surface rounded-xl p-4 border border-surface-border mb-6">
          <p className="text-text-secondary text-xs font-bold uppercase mb-2">Custom Amount</p>
          <div className="flex items-center gap-2"><Icon name="coins" size={18} className="text-primary"/>
            <input type="number" value={custom} onChange={e=>{setCustom(e.target.value);setSelected(null);}} placeholder="Enter amount..." className="flex-1 bg-transparent text-white text-lg font-bold outline-none"/>
          </div>
          {custom&&<p className="text-text-secondary text-sm mt-2">≈ R{(Number(custom)*0.23).toFixed(2)}</p>}
        </div>
        <button className="btn-primary w-full py-4 rounded-2xl text-lg font-bold">Purchase</button>
      </main>
    </div>);
}
