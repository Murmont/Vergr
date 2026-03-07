import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function EsportsTeamScreen() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!teamId) return;
    const unsub = onSnapshot(doc(db, 'teams', teamId), (doc) => {
      if (doc.exists()) setTeam({ id: doc.id, ...doc.data() });
      setLoading(false);
    });
    return unsub;
  }, [teamId]);

  if (loading) return <div className="screen-container min-h-screen flex items-center justify-center text-text-muted">Loading Team...</div>;
  if (!team) return <div className="screen-container min-h-screen flex items-center justify-center text-text-secondary">Team not found</div>;

  return (
    <div className="screen-container min-h-screen">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-white/80"><Icon name="arrow_back" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Team Profile</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto text-center">
        <div className="w-20 h-20 rounded-2xl bg-surface-3 mx-auto flex items-center justify-center text-3xl mb-3 overflow-hidden">
          {team.logo ? <img src={team.logo} className="w-full h-full object-cover" /> : '⚔️'}
        </div>
        <h2 className="text-white text-2xl font-bold">{team.name}</h2>
        <p className="text-brand-cyan font-mono">[{team.tag}]</p>
        <p className="text-text-secondary text-sm mt-1">{team.game} · {team.region}</p>
        
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="bg-surface-2 rounded-xl p-4 border border-border-accent">
            <p className="text-green-400 text-2xl font-bold">{team.wins || 0}</p>
            <p className="text-text-secondary text-xs">Wins</p>
          </div>
          <div className="bg-surface-2 rounded-xl p-4 border border-border-accent">
            <p className="text-red-400 text-2xl font-bold">{team.losses || 0}</p>
            <p className="text-text-secondary text-xs">Losses</p>
          </div>
        </div>
      </main>
    </div>
  );
}