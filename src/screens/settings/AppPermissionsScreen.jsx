import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function AppPermissionsScreen() {
  const navigate = useNavigate();
  const [perms, setPerms] = useState({camera:true,microphone:true,photos:false,location:false,notifications:true});
  const toggle = k => setPerms(p=>({...p,[k]:!p[k]}));
  const items = [{k:'camera',icon:'camera',label:'Camera',desc:'For profile photos and streams'},{k:'microphone',icon:'mic',label:'Microphone',desc:'For voice chat and streaming'},{k:'photos',icon:'image',label:'Photo Library',desc:'For uploading media'},{k:'location',icon:'map-pin',label:'Location',desc:'For nearby events and squads'},{k:'notifications',icon:'bell',label:'Notifications',desc:'Push notifications'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Permissions</h1></header>
      <main className="flex-1 px-5 pb-8">{items.map(i=>(
        <div key={i.k} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
          <Icon name={i.icon} size={20} className="text-primary"/>
          <div className="flex-1"><p className="text-white font-semibold text-sm">{i.label}</p><p className="text-text-secondary text-xs">{i.desc}</p></div>
          <button onClick={()=>toggle(i.k)} className={`w-12 h-7 rounded-full relative ${perms[i.k]?'bg-primary':'bg-surface-border'}`}><div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${perms[i.k]?'translate-x-6':'translate-x-1'}`}/></button>
        </div>))}</main>
    </div>);
}
