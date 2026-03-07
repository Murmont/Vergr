import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { submitRoundResult, finalizeTournament } from '../../firebase/firestore';
import Icon from '../../components/Icon';

export default function ModeratorMatchControlScreen() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFinalRound, setIsFinalRound] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch live match data
  useEffect(() => {
    if (!matchId) return;
    const unsub = onSnapshot(doc(db, 'tournaments', matchId), (doc) => {
      if (doc.exists()) {
        setMatch({ id: doc.id, ...doc.data() });
      }
      setLoading(false);
    });
    return () => unsub();
  }, [matchId]);

  const handleAction = async (winnerId, loserId) => {
    const actionName = isFinalRound ? "Finalize Tournament and Payout" : `Record Round ${currentRound}`;
    
    if (!window.confirm(`Confirm: ${actionName}?`)) return;

    setSubmitting(true);
    try {
      if (isFinalRound) {
        // Pass dynamic data: matchId, winnerId, and the prize from the document
        await finalizeTournament(matchId, winnerId, match.prizePool || 0);
        alert("Tournament Finalized. Payouts escrowed.");
        navigate('/admin/dashboard');
      } else {
        await submitRoundResult(matchId, currentRound, winnerId, loserId);
        alert(`Round ${currentRound} recorded.`);
        setCurrentRound(prev => prev + 1);
      }
    } catch (e) {
      console.error(e);
      alert("Error: " + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="screen-container text-white p-4">Loading match data...</div>;
  if (!match) return <div className="screen-container text-white p-4">Match not found.</div>;

  return (
    <div className="screen-container min-h-screen bg-bg-dark text-white p-4">
      <header className="flex items-center gap-4 mb-6 pt-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface rounded-full">
          <Icon name="arrow-left" size={24} />
        </button>
        <h1 className="text-lg font-bold font-syne">Match Control: {match.name}</h1>
      </header>

      {/* Stream Feeds Placeholder */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="aspect-video bg-black rounded-xl border border-border-accent flex items-center justify-center">
            <span className="text-text-secondary">Stream: {match.team1Name || 'Team 1'}</span>
        </div>
        <div className="aspect-video bg-black rounded-xl border border-border-accent flex items-center justify-center">
            <span className="text-text-secondary">Stream: {match.team2Name || 'Team 2'}</span>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-surface p-6 rounded-2xl border border-surface-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold">Match Actions</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isFinalRound} 
              onChange={(e) => setIsFinalRound(e.target.checked)} 
              className="accent-primary"
            />
            <span className="text-xs font-bold text-white uppercase">Final Round</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button 
            disabled={submitting}
            onClick={() => handleAction(match.team1Id, match.team2Id)}
            className={`py-4 font-bold rounded-xl ${isFinalRound ? 'bg-primary text-black' : 'bg-surface-border text-white'}`}
          >
            {match.team1Name || 'Player 1'} Win
          </button>
          <button 
            disabled={submitting}
            onClick={() => handleAction(match.team2Id, match.team1Id)}
            className={`py-4 font-bold rounded-xl ${isFinalRound ? 'bg-primary text-black' : 'bg-surface-border text-white'}`}
          >
            {match.team2Name || 'Player 2'} Win
          </button>
        </div>
      </div>
    </div>
  );
}