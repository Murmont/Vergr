import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function CreatorVerificationScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({realName:'',platform:'',followers:''});
  const set = (k,v) => setForm(p=>({...p,[k]:v}));
  const reqs = [{label:'500+ followers on any platform',met:true},{label:'Active account for 30+ days',met:true},{label:'No community guideline violations',met:true},{label:'Government-issued ID',met:false}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Creator Verification</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="flex justify-center mb-6"><div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"><Icon name="badge-check" size={32} className="text-primary"/></div></div>
        <p className="text-text-secondary text-sm mb-6 text-center">Get verified to unlock creator tools, analytics, and the verified badge.</p>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Requirements</p>
        {reqs.map(r=><div key={r.label} className="flex items-center gap-2 py-2"><Icon name={r.met?'check-circle':'circle'} size={16} className={r.met?'text-green-400':'text-text-secondary'}/><span className="text-white text-sm">{r.label}</span></div>)}
        <div className="flex flex-col gap-4 mt-6">
          <input value={form.realName} onChange={e=>set('realName',e.target.value)} placeholder="Legal Name" className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary"/>
          <input value={form.platform} onChange={e=>set('platform',e.target.value)} placeholder="Primary Platform (Twitch, YouTube...)" className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary"/>
          <button className="w-full py-3 bg-surface border border-dashed border-surface-border rounded-xl text-text-secondary text-sm flex items-center justify-center gap-2"><Icon name="upload" size={18}/>Upload ID Document</button>
        </div>
        <button onClick={()=>navigate('/verification-pending')} className="btn-primary w-full py-4 rounded-2xl text-lg font-bold mt-6">Submit Application</button>
      </main>
    </div>);
}
