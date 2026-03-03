import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card1');
  const methods = [{id:'card1',type:'Visa',last4:'4242',exp:'12/27'},{id:'card2',type:'Mastercard',last4:'8888',exp:'03/26'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Payment Method</h1></header>
      <main className="flex-1 px-5 pb-8">
        {methods.map(m=>(
          <button key={m.id} onClick={()=>setMethod(m.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl mb-3 border ${method===m.id?'bg-surface border-primary':'bg-surface/60 border-surface-border'}`}>
            <div className="w-12 h-8 bg-surface-border rounded flex items-center justify-center text-xs font-bold text-white">{m.type}</div>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">•••• {m.last4}</p><p className="text-text-secondary text-xs">Expires {m.exp}</p></div>
            {method===m.id&&<Icon name="check-circle" size={20} className="text-primary"/>}
          </button>))}
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-surface-border mt-4 text-primary font-semibold text-sm"><Icon name="plus" size={18}/>Add Payment Method</button>
      </main>
    </div>);
}
