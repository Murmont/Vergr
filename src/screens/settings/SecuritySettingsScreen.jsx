import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function SecuritySettingsScreen() {
  const navigate = useNavigate();
  const [twoFA, setTwoFA] = useState(false);
  const items = [{icon:'key',label:'Change Password',path:'/new-password'},{icon:'shield',label:'Two-Factor Authentication',toggle:true,key:'twoFA'},{icon:'smartphone',label:'Active Sessions',desc:'3 devices'},{icon:'log-out',label:'Sign Out All Devices',danger:true}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Security</h1></header>
      <main className="flex-1 px-5 pb-8">{items.map(i=>(
        <button key={i.label} onClick={()=>i.path&&navigate(i.path)} className="flex items-center gap-3 w-full py-4 border-b border-surface-border/30">
          <Icon name={i.icon} size={20} className={i.danger?'text-red-400':'text-primary'}/>
          <div className="flex-1 text-left"><p className={`font-semibold text-sm ${i.danger?'text-red-400':'text-white'}`}>{i.label}</p>{i.desc&&<p className="text-text-secondary text-xs">{i.desc}</p>}</div>
          {i.toggle?<button onClick={e=>{e.stopPropagation();setTwoFA(!twoFA);}} className={`w-12 h-7 rounded-full relative ${twoFA?'bg-primary':'bg-surface-border'}`}><div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${twoFA?'translate-x-6':'translate-x-1'}`}/></button>:<Icon name="chevron-right" size={18} className="text-text-secondary"/>}
        </button>))}</main>
    </div>);
}
