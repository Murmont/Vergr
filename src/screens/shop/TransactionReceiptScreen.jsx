import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function TransactionReceiptScreen() {
  const navigate = useNavigate();
  const tx = {id:'TXN-2026-0302-001',type:'Purchase',item:'500 Coin Pack',amount:'€4.49',coins:'+550',method:'Visa •••• 4242',date:'Mar 2, 2026 at 14:32',status:'Completed'};
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Receipt</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-surface rounded-2xl p-6 border border-surface-border">
          <div className="flex justify-center mb-6"><div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center"><Icon name="check-circle" size={32} className="text-green-400"/></div></div>
          <h2 className="text-white text-xl font-bold text-center mb-1">{tx.amount}</h2>
          <p className="text-green-400 font-bold text-center mb-6">{tx.coins} coins</p>
          <div className="border-t border-surface-border pt-4 flex flex-col gap-3">
            {Object.entries({ID:tx.id,Type:tx.type,Item:tx.item,Payment:tx.method,Date:tx.date,Status:tx.status}).map(([l,v])=>(
              <div key={l} className="flex justify-between"><span className="text-text-secondary text-sm">{l}</span><span className="text-white text-sm font-semibold">{v}</span></div>))}
          </div>
        </div>
      </main>
    </div>);
}
