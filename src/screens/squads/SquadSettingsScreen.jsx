import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function SquadSettingsScreen() {
  const { squadId } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({ name:'Apex Predators', desc:'Elite squad for competitive gamers', isPrivate:false, approveMembers:true, allowInvites:true, muteNotifs:false });
  const toggle = k => setSettings(p=>({...p,[k]:!p[k]}));

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">Squad Settings</h1>
        <button className="text-primary font-semibold text-sm">Save</button>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="flex flex-col gap-4 mb-6">
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">Squad Name</span>
            <input value={settings.name} onChange={e=>setSettings(p=>({...p,name:e.target.value}))} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary"/></label>
          <label className="block"><span className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2 block">Description</span>
            <textarea value={settings.desc} onChange={e=>setSettings(p=>({...p,desc:e.target.value}))} rows={3} className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary resize-none"/></label>
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Privacy & Access</p>
          {[{k:'isPrivate',label:'Private Squad',desc:'Only invited members can join'},{k:'approveMembers',label:'Approve Members',desc:'Review join requests before accepting'},{k:'allowInvites',label:'Member Invites',desc:'Allow members to invite others'}].map(s=>(
            <div key={s.k} className="flex items-center justify-between py-4 border-b border-surface-border/50">
              <div><p className="text-white font-semibold text-sm">{s.label}</p><p className="text-text-secondary text-xs">{s.desc}</p></div>
              <button onClick={()=>toggle(s.k)} className={`w-12 h-7 rounded-full transition-colors ${settings[s.k]?'bg-primary':'bg-surface-border'} relative`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${settings[s.k]?'translate-x-6':'translate-x-1'}`}/>
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Quick Actions</p>
          {[{icon:'users',label:'Manage Members',path:`/squads/${squadId}/members`},{icon:'shield',label:'Roles & Permissions',path:`/squads/${squadId}/roles`},{icon:'image',label:'Media Gallery',path:`/squads/${squadId}/media`},{icon:'pin',label:'Pinned Messages',path:`/squads/${squadId}/pinned`}].map(a=>(
            <button key={a.label} onClick={()=>navigate(a.path)} className="flex items-center gap-3 py-4 border-b border-surface-border/50">
              <Icon name={a.icon} size={20} className="text-primary"/><span className="flex-1 text-white text-sm font-semibold text-left">{a.label}</span><Icon name="chevron-right" size={18} className="text-text-secondary"/>
            </button>
          ))}
        </div>
        <button className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 font-bold text-sm">Leave Squad</button>
        <button className="w-full py-3 rounded-xl text-red-400/60 font-semibold text-sm mt-2">Delete Squad</button>
      </main>
    </div>
  );
}
