import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

export default function FollowListScreen() {
  const { uid, type } = useParams(); // type is 'followers' or 'following'
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (!userDoc.exists()) return;

        const ids = type === 'followers' 
          ? userDoc.data().followerIds || [] 
          : userDoc.data().followingIds || [];

        if (ids.length === 0) {
          setUsers([]);
          return;
        }

        // Fetch user details for all IDs in the list
        const q = query(collection(db, 'users'), where('__name__', 'in', ids.slice(0, 10)));
        const snap = await getDocs(q);
        setUsers(snap.docs.map(d => ({ uid: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [uid, type]);

  return (
    <div className="screen-container min-h-screen">
      <TopBar title={type === 'followers' ? 'Followers' : 'Following'} showBack />
      
      <div className="divide-y divide-border-accent/20">
        {loading ? (
          <div className="p-10 text-center text-text-muted text-sm">Loading users...</div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div key={user.uid} onClick={() => navigate(`/user/${user.username}`)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-1/50">
              <UserAvatar src={user.avatar} size={48} tier={user.verificationTier} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm truncate text-text-primary">{user.displayName}</span>
                </div>
                <p className="text-text-muted text-xs">@{user.username}</p>
              </div>
              <Icon name="chevron_right" size={20} className="text-text-muted" />
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-text-secondary">No {type} yet.</div>
        )}
      </div>
    </div>
  );
}