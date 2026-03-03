import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function StreamEndingScreen() {
  const navigate = useNavigate();
  const stats = [{label:'Duration',value:'3h 24m'},{label:'Peak Viewers',value:'3,240'},{label:'Total Views',value:'8,912'},{label:'New Followers',value:'87'},{label:'Tips',value:'450 coins'},{label:'Chat Messages',value:'4,231'}];
  return (
    <div className="screen-container min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"><Icon name="tv" size={36} className="text-primary"/></div>
      <h1 className="font-syne text-white text-3xl font-extrabold text-center mb-2">Stream Ended</h1>
      <p className="text-text-secondary text-base text-center mb-8">Great stream! Here's your summary.</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-[360px] mb-8">{stats.map(s=>(
        <div key={s.label} className="bg-surface rounded-xl p-4 text-center border border-surface-border">
          <p className="text-text-secondary text-xs mb-1">{s.label}</p><p className="text-white text-lg font-bold">{s.value}</p>
        </div>))}</div>
      <button onClick={()=>navigate('/creator/dashboard')} className="btn-primary w-full max-w-[360px] py-4 rounded-2xl text-lg font-bold mb-3">View Full Analytics</button>
      <button onClick={()=>navigate('/')} className="text-text-secondary font-semibold text-sm">Back to Home</button>
    </div>);
}
