import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function SquadAnnouncementsScreen() {
  const navigate = useNavigate();
  const announcements = [
    { id:1, author:'NeonBlade', tier:'Gold', title:'Tournament Registration Open', content:'Sign up for this weekend\'s squad tournament. Prize pool is 5000 coins!', time:'3h ago', pinned:true },
    { id:2, author:'PixelQueen', tier:'Diamond', title:'New Squad Rules Update', content:'Please review the updated rules. Toxic behavior will result in immediate removal.', time:'1d ago', pinned:true },
    { id:3, author:'NeonBlade', tier:'Gold', title:'GG to everyone last night!', content:'Great scrims. Let\'s keep the momentum going into the tournament.', time:'2d ago', pinned:false },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">Announcements</h1>
        <button className="text-primary"><Icon name="plus" size={22}/></button>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {announcements.map(a=>(
          <div key={a.id} className={`bg-surface rounded-xl p-4 mb-3 ${a.pinned?'border-l-2 border-primary':''}`}>
            <div className="flex items-center gap-2 mb-2">
              <UserAvatar username={a.author} tier={a.tier} size={28}/>
              <span className="text-white text-sm font-semibold">@{a.author}</span>
              {a.pinned&&<Icon name="pin" size={12} className="text-primary"/>}
              <span className="text-text-secondary text-xs ml-auto">{a.time}</span>
            </div>
            <h3 className="text-white font-bold mb-1">{a.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{a.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
