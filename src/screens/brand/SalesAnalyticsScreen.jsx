import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function SalesAnalyticsScreen() {
  const navigate = useNavigate();
  const stats = [{label:'Total Revenue',value:'€1,225',change:'+18%'},{label:'Orders',value:'156',change:'+12%'},{label:'Avg Order',value:'€7.85',change:'+3%'},{label:'Return Rate',value:'2.1%',change:'-0.5%'}];
  const topProducts = [{name:'Velocity X Mouse',sales:68,revenue:'€3,057'},{name:'VERGR Hoodie',sales:52,revenue:'€1,557'},{name:'RGB Mousepad XL',sales:36,revenue:'€628'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Sales Analytics</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 mb-6">{stats.map(s=>(
          <div key={s.label} className="bg-surface rounded-xl p-4 border border-surface-border"><p className="text-text-secondary text-xs mb-1">{s.label}</p><p className="text-white text-xl font-bold">{s.value}</p><p className="text-green-400 text-xs font-semibold">{s.change}</p></div>))}</div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Top Products</p>
        {topProducts.map((p,i)=>(
          <div key={p.name} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <span className="text-text-secondary font-bold w-6">{i+1}</span>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{p.name}</p><p className="text-text-secondary text-xs">{p.sales} sold</p></div>
            <span className="text-primary font-bold text-sm">{p.revenue}</span>
          </div>))}
      </main>
    </div>);
}
