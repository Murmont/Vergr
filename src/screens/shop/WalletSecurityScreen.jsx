import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function WalletSecurityScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({pinLock:true,biometric:false,txAlerts:true,withdrawalConfirm:true});
  const toggle = k => setSettings(p=>({...p,[k]:!p[k]}));
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Wallet Security</h1></header>
      <main className="flex-1 px-5 pb-8">
        {[{k:'pinLock',icon:'lock',label:'PIN Lock',desc:'Require PIN for transactions'},{k:'biometric',icon:'fingerprint',label:'Biometric Auth',desc:'Use fingerprint or face ID'},{k:'txAlerts',icon:'bell',label:'Transaction Alerts',desc:'Get notified on every transaction'},{k:'withdrawalConfirm',icon:'shield',label:'Withdrawal Confirmation',desc:'Extra verification for payouts'}].map(s=>(
          <div key={s.k} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
            <Icon name={s.icon} size={20} className="text-primary"/>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{s.label}</p><p className="text-text-secondary text-xs">{s.desc}</p></div>
            <button onClick={()=>toggle(s.k)} className={`w-12 h-7 rounded-full relative ${settings[s.k]?'bg-primary':'bg-surface-border'}`}><div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${settings[s.k]?'translate-x-6':'translate-x-1'}`}/></button>
          </div>))}
      </main>
    </div>);
}
