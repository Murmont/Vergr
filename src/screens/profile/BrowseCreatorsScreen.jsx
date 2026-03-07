import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function BrowseCreatorsScreen() {
  const [creators, setCreators] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      const q = query(collection(db, 'users'), where('isCreator', '==', true));
      const snap = await getDocs(q);
      setCreators(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchCreators();
  }, []);

  if (loading) return <div className="screen-container min-h-screen flex items-center justify-center text-text-muted">Searching for creators...</div>;
  if (creators.length === 0) return <div className="screen-container min-h-screen flex items-center justify-center text-text-secondary">No creators found yet.</div>;

  const c = creators[idx];

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-white/80"><Icon name="arrow_back" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Discover Creators</h1>
      </header>
      <main className="flex-1 px-5 pb-8 flex flex-col items-center justify-center">
        <div className="bg-surface-2 rounded-2xl p-6 w-full max-w-[360px] border border-border-accent text-center shadow-2xl">
          <UserAvatar src={c.avatar} size={80} tier={c.verificationTier} />
          <h2 className="text-white text-xl font-bold mt-4">{c.displayName}</h2>
          <p className="text-brand-cyan text-sm">@{c.username}</p>
          <p className="text-text-secondary text-sm mt-3 mb-6">{c.bio || "No bio provided."}</p>
          <div className="flex gap-3">
            <button onClick={() => setIdx(p => (p + 1) % creators.length)} className="flex-1 py-3 bg-surface-3 rounded-xl text-text-primary font-bold">Next</button>
            <button onClick={() => navigate(`/user/${c.username}`)} className="flex-1 py-3 bg-brand-cyan rounded-xl text-bg-dark font-bold">View Profile</button>
          </div>
        </div>
      </main>
    </div>
  );
}