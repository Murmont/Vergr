import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

export default function SearchResultsStreamsScreen() {
  const navigate = useNavigate();
  const streams = [
    { id:'s1', title:'Ranked Grind to Radiant', streamer:'NeonBlade', game:'Valorant', viewers:1240, thumb:'🎮' },
    { id:'s2', title:'Chill RPG Night', streamer:'PixelQueen', game:'Elden Ring', viewers:890, thumb:'⚔️' },
    { id:'s3', title:'Tournament Finals', streamer:'FragMaster', game:'Apex Legends', viewers:3200, thumb:'🏆' },
    { id:'s4', title:'Speedrun Practice', streamer:'LootGoblin', game:'Hollow Knight', viewers:420, thumb:'🏃' },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col pb-20">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Stream Results</h1>
      </header>
      <main className="flex-1 px-5 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {streams.map(s=>(
            <button key={s.id} onClick={()=>navigate(`/stream/${s.id}`)} className="bg-surface rounded-xl overflow-hidden text-left">
              <div className="h-24 bg-surface-border flex items-center justify-center text-3xl relative">
                {s.thumb}<span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">{s.viewers.toLocaleString()}</span>
              </div>
              <div className="p-3"><p className="text-white text-sm font-semibold truncate">{s.title}</p><p className="text-text-secondary text-xs">{s.streamer} · {s.game}</p></div>
            </button>
          ))}
        </div>
      </main>
      <BottomNav/>
    </div>
  );
}
