import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function StreamModerationScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({slowMode:false,subsOnly:false,linksBlocked:true,autoMod:true});
  const toggle = k => setSettings(p=>({...p,[k]:!p[k]}));
  const recentActions = [{user:'ToxicUser123',action:'Timed out 10min',reason:'Spam',time:'2m ago'},{user:'SpamBot',action:'Banned',reason:'Bot activity',time:'15m ago'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Moderation Tools</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Chat Settings</p>
        {[{k:'slowMode',label:'Slow Mode',desc:'30s between messages'},{k:'subsOnly',label:'Subscribers Only',desc:'Only subs can chat'},{k:'linksBlocked',label:'Block Links',desc:'Prevent links in chat'},{k:'autoMod',label:'Auto-Moderation',desc:'AI-powered content filtering'}].map(s=>(
          <div key={s.k} className="flex items-center justify-between py-4 border-b border-surface-border/30">
            <div><p className="text-white font-semibold text-sm">{s.label}</p><p className="text-text-secondary text-xs">{s.desc}</p></div>
            <button onClick={()=>toggle(s.k)} className={`w-12 h-7 rounded-full relative ${settings[s.k]?'bg-primary':'bg-surface-border'}`}><div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${settings[s.k]?'translate-x-6':'translate-x-1'}`}/></button>
          </div>))}
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3 mt-6">Recent Actions</p>
        {recentActions.map(a=>(
          <div key={a.user} className="bg-surface rounded-xl p-3 mb-2 border border-surface-border">
            <div className="flex justify-between mb-1"><span className="text-white font-semibold text-sm">@{a.user}</span><span className="text-text-secondary text-xs">{a.time}</span></div>
            <p className="text-red-400 text-xs">{a.action} — {a.reason}</p>
          </div>))}
      </main>
    </div>);
}
