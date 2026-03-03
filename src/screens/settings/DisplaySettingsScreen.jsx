import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function DisplaySettingsScreen() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Display</h1></header>
      <main className="flex-1 px-5 pb-8">
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Theme</p>
        <div className="flex gap-3 mb-6">{['dark','light','system'].map(t=>(
          <button key={t} onClick={()=>setTheme(t)} className={`flex-1 py-3 rounded-xl text-sm font-bold ${theme===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}</div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Font Size</p>
        <div className="flex gap-3 mb-6">{['small','medium','large'].map(s=>(
          <button key={s} onClick={()=>setFontSize(s)} className={`flex-1 py-3 rounded-xl text-sm font-bold ${fontSize===s?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
        ))}</div>
        <div className="flex items-center justify-between py-4 border-t border-surface-border/30">
          <div><p className="text-white font-semibold text-sm">Reduced Motion</p><p className="text-text-secondary text-xs">Minimize animations</p></div>
          <button onClick={()=>setReducedMotion(!reducedMotion)} className={`w-12 h-7 rounded-full relative ${reducedMotion?'bg-primary':'bg-surface-border'}`}><div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-transform ${reducedMotion?'translate-x-6':'translate-x-1'}`}/></button>
        </div>
      </main>
    </div>);
}
