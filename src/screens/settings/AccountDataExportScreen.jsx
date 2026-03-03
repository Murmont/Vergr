import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import { useUI } from '../../context/UIContext';
export default function AccountDataExportScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const [requested, setRequested] = useState(false);
  const dataTypes = [{icon:'user',label:'Profile Information'},{icon:'file-text',label:'Posts & Comments'},{icon:'message-circle',label:'Messages'},{icon:'users',label:'Squad Data'},{icon:'coins',label:'Transaction History'},{icon:'settings',label:'Account Settings'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Export Data</h1></header>
      <main className="flex-1 px-5 pb-8">
        <p className="text-text-secondary text-sm mb-6">Download a copy of your data. We'll email you a link when your export is ready (usually within 24 hours).</p>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Data included</p>
        {dataTypes.map(d=>(
          <div key={d.label} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <Icon name={d.icon} size={18} className="text-primary"/><span className="text-white text-sm">{d.label}</span>
          </div>))}
        <button onClick={()=>{setRequested(true);showToast('Export requested! Check your email.','success');}} disabled={requested}
          className={`w-full py-4 rounded-2xl text-lg font-bold mt-8 ${requested?'bg-surface text-text-secondary':'btn-primary'}`}>
          {requested?'Export Requested ✓':'Request Data Export'}
        </button>
      </main>
    </div>);
}
