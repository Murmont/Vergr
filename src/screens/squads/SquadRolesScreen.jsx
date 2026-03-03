import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function SquadRolesScreen() {
  const navigate = useNavigate();
  const [expandedRole, setExpandedRole] = useState(null);
  const roles = [
    { id:'leader', name:'Leader', color:'#FFD700', count:1, perms:['Manage all settings','Remove members','Assign roles','Delete squad'] },
    { id:'officer', name:'Officer', color:'#51fbd9', count:3, perms:['Pin messages','Mute members','Manage events','Approve join requests'] },
    { id:'veteran', name:'Veteran', color:'#7B6FFF', count:12, perms:['Create events','Invite members','Start challenges'] },
    { id:'member', name:'Member', color:'#6B7280', count:112, perms:['Send messages','Join events','View media'] },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Roles & Permissions</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {roles.map(r=>(
            <div key={r.id} className="bg-surface rounded-xl border border-surface-border overflow-hidden">
              <button onClick={()=>setExpandedRole(expandedRole===r.id?null:r.id)} className="w-full flex items-center gap-3 p-4">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor:r.color}}/>
                <div className="flex-1 text-left"><p className="text-white font-bold">{r.name}</p><p className="text-text-secondary text-xs">{r.count} member{r.count!==1?'s':''}</p></div>
                <Icon name={expandedRole===r.id?'chevron-up':'chevron-down'} size={18} className="text-text-secondary"/>
              </button>
              {expandedRole===r.id&&<div className="px-4 pb-4 border-t border-surface-border/50 pt-3">
                <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">Permissions</p>
                {r.perms.map(p=><div key={p} className="flex items-center gap-2 py-1.5"><Icon name="check" size={14} className="text-primary"/><span className="text-white text-sm">{p}</span></div>)}
              </div>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
