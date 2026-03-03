import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function AccountDeletionScreen() {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState('');
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Delete Account</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex gap-3">
          <Icon name="alert-triangle" size={20} className="text-red-400 shrink-0 mt-0.5"/><p className="text-red-300 text-sm leading-relaxed">This action is permanent and cannot be undone. All your data, coins, and history will be permanently deleted.</p>
        </div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">What you'll lose</p>
        {['Profile and all content','Coin balance and transaction history','Squad memberships','Messages and connections','Creator earnings and analytics'].map(i=>(
          <div key={i} className="flex items-center gap-2 py-2"><Icon name="x-circle" size={16} className="text-red-400"/><span className="text-white text-sm">{i}</span></div>))}
        <label className="block mt-6"><span className="text-text-secondary text-sm mb-2 block">Type <span className="text-red-400 font-bold">DELETE</span> to confirm</span>
          <input value={confirm} onChange={e=>setConfirm(e.target.value)} className="w-full bg-surface border border-red-500/30 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" placeholder="DELETE"/>
        </label>
        <button disabled={confirm!=='DELETE'} className={`w-full py-4 rounded-2xl text-lg font-bold mt-6 ${confirm==='DELETE'?'bg-red-500 text-white':'bg-surface text-text-secondary'}`}>Permanently Delete Account</button>
        <button onClick={()=>navigate(-1)} className="w-full py-3 text-text-secondary font-semibold text-sm mt-2">Cancel</button>
      </main>
    </div>);
}
