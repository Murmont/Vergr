import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

export default function PublicProfileScreen() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Posts');
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'users'), where('username', '==', username));
    
    // Kept your onSnapshot logic for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const userData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        setUser(userData);
        
        if (auth.currentUser && userData.followerIds) {
          setIsFollowing(userData.followerIds.includes(auth.currentUser.uid));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [username]);

  if (loading) return <div className="screen-container min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent animate-spin rounded-full"></div></div>;
  if (!user) return <div className="screen-container min-h-screen flex items-center justify-center text-text-muted">User not found</div>;

  // XP Progress Calculation
  const currentLevel = user.level || 1;
  const totalXP = user.totalXP || 0;
  const xpInRange = totalXP % 1000;
  const progressPercent = Math.min((xpInRange / 1000) * 100, 100);

  return (
    <div className="screen-container min-h-screen bg-bg-dark text-white">
      {/* Profile Header */}
      <div className="relative h-32 bg-surface-2" />
      <div className="px-4 -mt-12">
        <div className="flex justify-between items-end mb-4">
          <UserAvatar src={user.avatar} size={80} />
          <button className={`px-6 py-2 rounded-full bg-brand-cyan text-bg-dark font-bold text-sm ${isFollowing ? 'opacity-80' : ''}`}>
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-text-primary">{user.displayName}</h2>
        <p className="text-brand-cyan font-medium">@{user.username}</p>
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">{user.bio || "No bio yet."}</p>

        {/* --- ADDED XP PROGRESS BAR --- */}
        <div className="mt-6 mb-6 p-4 bg-surface-1 rounded-2xl border border-border-accent">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-text-secondary font-bold">Level {currentLevel}</span>
            <span className="text-brand-cyan font-dmmono">{totalXP} Total XP</span>
          </div>
          <div className="h-2 w-full bg-bg-dark rounded-full overflow-hidden border border-border-accent/30">
            <div 
              className="h-full bg-brand-gradient transition-all duration-500" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
        
        <div className="flex gap-6 mt-4">
          <div className="flex gap-1.5 items-center"><span className="text-text-primary font-bold">{user.followerCount || 0}</span><span className="text-text-muted text-sm">Followers</span></div>
          <div className="flex gap-1.5 items-center"><span className="text-text-primary font-bold">{user.followingCount || 0}</span><span className="text-text-muted text-sm">Following</span></div>
        </div>
      </div>

      <div className="flex border-b border-border-accent mt-6">
        {['Posts', 'Media'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center relative ${activeTab === tab ? 'text-brand-cyan' : 'text-text-muted'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />}
          </button>
        ))}
      </div>
    </div>
  );
}