import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

export default function SquadsScreen() {
  const [activeTab, setActiveTab] = useState('My Squads');
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    // Fixed query to check 'memberIds' array for the current user
    const q = activeTab === 'My Squads' 
      ? query(collection(db, 'squads'), where('memberIds', 'array-contains', auth.currentUser.uid))
      : query(collection(db, 'squads'), where('isPublic', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSquads(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab]);

  return (
    <div className="screen-container min-h-screen pb-20 bg-bg-dark">
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl px-4 py-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-syne text-xl font-bold text-white">Squads</h1>
          {/* Fixed + button navigation */}
          <button 
            onClick={() => navigate('/squads/create')}
            className="w-10 h-10 rounded-full bg-brand-cyan text-bg-dark flex items-center justify-center shadow-lg shadow-brand-cyan/20 hover:scale-105 transition-transform"
          >
            <Icon name="add" size={24} />
          </button>
        </div>
        
        <div className="flex gap-4">
          {['My Squads', 'Discover'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-6 h-6 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-text-muted text-[10px] font-dmmono uppercase tracking-widest">Assembling Data...</p>
          </div>
        ) : squads.length > 0 ? (
          <div className="space-y-3">
            {squads.map(squad => (
              <button 
                key={squad.id} 
                onClick={() => navigate(`/squads/${squad.id}`)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border-accent bg-surface-1 hover:border-brand-cyan/30 transition-all text-left group"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface-3 flex items-center justify-center text-2xl overflow-hidden border border-white/5 group-hover:border-brand-cyan/20">
                  {squad.image ? <img src={squad.image} className="w-full h-full object-cover" alt="" /> : squad.icon || '🎮'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary truncate">{squad.name}</span>
                    {!squad.isPublic && <Icon name="lock" size={14} className="text-text-muted" />}
                  </div>
                  <p className="text-text-muted text-[11px] font-dmmono uppercase tracking-tight">{squad.game} · {squad.memberCount || 0} Members</p>
                </div>
                <Icon name="chevron_right" size={20} className="text-text-muted group-hover:text-brand-cyan transition-colors" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-surface-2 border border-border-accent flex items-center justify-center mb-6">
              <Icon name="groups" size={40} className="text-brand-cyan" />
            </div>
            <h2 className="text-xl font-syne font-bold text-white mb-2">Join the Elite</h2>
            <p className="text-text-muted text-sm max-w-[240px] mb-8">You aren't part of a squad yet. Assemble your team or discover active communities.</p>
            
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={() => navigate('/onboarding/welcome')}
                className="w-full py-4 rounded-2xl bg-brand-cyan text-bg-dark font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-cyan/10"
              >
                Discover Squads
              </button>
              <button 
                onClick={() => navigate('/squads/create')}
                className="w-full py-4 rounded-2xl bg-surface-2 text-white border border-border-accent font-bold text-sm hover:bg-surface-3 transition-all"
              >
                Create New Squad
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}