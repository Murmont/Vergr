import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function SquadEventsScreen() {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const events = [
    { id:1, title:'Weekly Scrim Night', date:'Sat, Mar 8', time:'8:00 PM', game:'Valorant', attendees:12, color:'#51fbd9' },
    { id:2, title:'Tournament Practice', date:'Sun, Mar 9', time:'3:00 PM', game:'Apex Legends', attendees:8, color:'#7B6FFF' },
    { id:3, title:'Movie Night (Chill)', date:'Fri, Mar 14', time:'9:00 PM', game:'Discord VC', attendees:20, color:'#C87FFF' },
    { id:4, title:'Ranked Push Day', date:'Sat, Mar 15', time:'2:00 PM', game:'Valorant', attendees:5, color:'#FFD700' },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">Events</h1>
        <button className="text-primary"><Icon name="plus" size={22}/></button>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {events.map(e=>(
          <div key={e.id} className="bg-surface rounded-xl p-4 mb-3 border-l-4 flex gap-4" style={{borderColor:e.color}}>
            <div className="flex flex-col items-center bg-surface-border rounded-lg px-3 py-2 min-w-[60px]">
              <span className="text-text-secondary text-xs">{e.date.split(',')[0]}</span>
              <span className="text-white text-lg font-bold">{e.date.split(' ').pop()}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">{e.title}</h3>
              <p className="text-text-secondary text-xs mb-1">{e.time} · {e.game}</p>
              <p className="text-text-secondary text-xs">{e.attendees} attending</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
