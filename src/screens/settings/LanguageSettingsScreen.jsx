import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function LanguageSettingsScreen() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const langs = [{code:'en',label:'English'},{code:'es',label:'Español'},{code:'fr',label:'Français'},{code:'de',label:'Deutsch'},{code:'pt',label:'Português'},{code:'ja',label:'日本語'},{code:'ko',label:'한국어'},{code:'zh',label:'中文'},{code:'ar',label:'العربية'},{code:'af',label:'Afrikaans'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Language</h1></header>
      <main className="flex-1 px-5 pb-8">{langs.map(l=>(
        <button key={l.code} onClick={()=>setLang(l.code)} className="flex items-center gap-3 w-full py-4 border-b border-surface-border/30">
          <span className="flex-1 text-white font-semibold text-sm text-left">{l.label}</span>
          {lang===l.code&&<Icon name="check" size={20} className="text-primary"/>}
        </button>))}</main>
    </div>);
}
