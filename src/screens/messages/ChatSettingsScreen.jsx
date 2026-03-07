import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function ChatSettingsScreen() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);

  useEffect(() => {
    return onSnapshot(doc(db, 'chats', chatId), (s) => {
      if (s.exists()) setChat({ id: s.id, ...s.data() });
    });
  }, [chatId]);

  const leaveGroup = async () => {
    if (!window.confirm('Leave this group?')) return;
    await updateDoc(doc(db, 'chats', chatId), {
      participantIds: arrayRemove(auth.currentUser.uid)
    });
    navigate('/messages');
  };

  if (!chat) return null;

  return (
    <div className="screen-container min-h-screen">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4 border-b border-border-accent">
        <button onClick={() => navigate(-1)}><Icon name="arrow_back" size={24} /></button>
        <h1 className="text-white font-syne font-bold text-lg">{chat.isGroup ? 'Group Info' : 'Details'}</h1>
      </header>
      
      <main className="px-5 py-8 text-center">
        <div className="w-24 h-24 rounded-3xl bg-surface-3 mx-auto flex items-center justify-center text-4xl mb-4 overflow-hidden">
          {chat.groupIcon ? <img src={chat.groupIcon} className="w-full h-full object-cover" /> : chat.isGroup ? '👥' : '👤'}
        </div>
        <h2 className="text-xl font-bold text-white">{chat.groupName || 'Direct Message'}</h2>
        
        <div className="mt-10 space-y-2">
          {chat.isGroup && (
            <>
              <p className="text-left text-text-muted text-xs font-bold uppercase tracking-widest mb-2">Members ({chat.participantIds.length})</p>
              <div className="bg-surface-1 rounded-2xl border border-border-accent divide-y divide-border-accent/30 overflow-hidden">
                {chat.participantIds.map(id => (
                  <div key={id} className="flex items-center gap-3 p-4">
                    <UserAvatar size={32} />
                    <span className="text-sm text-text-primary">User {id.slice(0, 5)}</span>
                  </div>
                ))}
              </div>
              <button onClick={leaveGroup} className="w-full py-4 rounded-2xl bg-brand-ember/10 text-brand-ember font-bold text-sm mt-6">
                Leave Group
              </button>
            </>
          )}
          <button className="w-full py-4 rounded-2xl bg-surface-2 border border-border-accent text-text-secondary font-bold text-sm">
            Block User
          </button>
        </div>
      </main>
    </div>
  );
}