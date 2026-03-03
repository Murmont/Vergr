import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function SquadMediaScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('images');
  const images = Array.from({length:12},(_,i)=>({ id:i, type:'image', color:`hsl(${i*30},60%,30%)` }));
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Media Gallery</h1>
      </header>
      <div className="flex gap-2 px-5 mb-4">
        {['images','videos','files'].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="grid grid-cols-3 gap-1.5">
          {images.map(img=>(
            <div key={img.id} className="aspect-square rounded-lg overflow-hidden" style={{backgroundColor:img.color}}>
              <div className="w-full h-full flex items-center justify-center"><Icon name="image" size={20} className="text-white/30"/></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
