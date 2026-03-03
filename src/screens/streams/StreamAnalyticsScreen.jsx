import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function StreamAnalyticsScreen() {
  const navigate = useNavigate();
  const stats = [{label:'Peak Viewers',value:'3,240',change:'+12%'},{label:'Avg Viewers',value:'1,890',change:'+8%'},{label:'Stream Hours',value:'48.5h',change:'+15%'},{label:'New Followers',value:'342',change:'+22%'},{label:'Tips Received',value:'1,200',change:'+5%'},{label:'Chat Messages',value:'15.4K',change:'+18%'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Stream Analytics</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 mb-6">{stats.map(s=>(
          <div key={s.label} className="bg-surface rounded-xl p-4 border border-surface-border">
            <p className="text-text-secondary text-xs mb-1">{s.label}</p>
            <p className="text-white text-xl font-bold">{s.value}</p>
            <p className="text-green-400 text-xs font-semibold">{s.change}</p>
          </div>))}</div>
        <div className="bg-surface rounded-xl p-4 border border-surface-border mb-4">
          <p className="text-white font-bold mb-3">Viewer Trend</p>
          <div className="h-32 flex items-end gap-1">{[30,45,60,55,70,85,75,90,80,95,88,100].map((h,i)=>(<div key={i} className="flex-1 bg-primary/20 rounded-t" style={{height:`${h}%`}}><div className="w-full bg-primary rounded-t" style={{height:'40%'}}/></div>))}</div>
          <div className="flex justify-between mt-2 text-text-secondary text-[10px]"><span>12PM</span><span>3PM</span><span>6PM</span><span>9PM</span></div>
        </div>
      </main>
    </div>);
}
