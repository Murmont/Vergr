import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function TransactionFiltersScreen() {
  const navigate = useNavigate();
  const [type, setType] = useState('all');
  const [period, setPeriod] = useState('30d');
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg flex-1">Filters</h1><button onClick={()=>navigate(-1)} className="text-primary font-semibold text-sm">Apply</button></header>
      <main className="flex-1 px-5 pb-8">
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Transaction Type</p>
        <div className="flex flex-wrap gap-2 mb-6">{['all','purchases','earnings','tips','transfers'].map(t=>(
          <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${type===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>))}</div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Time Period</p>
        <div className="flex flex-wrap gap-2">{[['7d','7 Days'],['30d','30 Days'],['90d','90 Days'],['all','All Time']].map(([k,l])=>(
          <button key={k} onClick={()=>setPeriod(k)} className={`px-4 py-2 rounded-full text-sm font-bold ${period===k?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{l}</button>))}</div>
      </main>
    </div>);
}
