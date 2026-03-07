import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';
import { timeAgo, getTier } from '../../utils/helpers';

export default function MessagesInboxScreen() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    /** * IMPORTANT: This query requires a Composite Index in Firebase:
     * Collection: conversations
     * Fields: participants (Array), status (Asc), lastMessageAt (Desc)
     */
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', auth.currentUser.uid),
      where('status', '==', 'active'), 
      orderBy('lastMessageAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setConversations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Inbox listener error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="screen-container min-h-screen pb-20 bg-bg-dark">
      <TopBar 
        title="Messages" 
        showBack 
        actions={
          <div className="flex items-center gap-2">
            {/* Link to the Message Requests Screen */}
            <button 
              onClick={() => navigate('/messages/requests')} 
              className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors relative"
            >
              <Icon name="mail" size={20} className="text-text-muted" />
            </button>
            <button 
              onClick={() => navigate('/messages/new')} 
              className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors"
            >
              <Icon name="edit_square" size={20} className="text-brand-cyan" />
            </button>
          </div>
        } 
      />
      
      <div className="px-2 mt-2">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">Syncing Encrypted Comms...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="py-32 text-center px-10">
            <div className="w-20 h-20 bg-surface-1 rounded-full flex items-center justify-center mx-auto mb-6 border border-border-accent/20">
              <Icon name="chat_bubble_outline" size={32} className="text-text-muted opacity-20" />
            </div>
            <h3 className="text-white font-bold mb-2">No Transmissions</h3>
            <p className="text-text-muted text-xs leading-relaxed">
              Your inbox is clear. Start a new conversation or check your message requests.
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={() => navigate('/messages/new')}
                className="px-6 py-3 bg-brand-cyan text-bg-dark font-black text-[10px] uppercase tracking-widest rounded-full"
              >
                New Message
              </button>
              <button 
                onClick={() => navigate('/messages/requests')}
                className="px-6 py-3 bg-surface-2 text-white font-black text-[10px] uppercase tracking-widest rounded-full border border-border-accent/50"
              >
                View Requests
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map(conv => {
              const otherId = conv.participants.find(id => id !== auth.currentUser.uid);
              const displayData = conv.isGroup 
                  ? { name: conv.groupName, avatar: conv.groupIcon } 
                  : conv.metadata?.[otherId] || { name: 'Unknown User', avatar: null, coinsSpent: 0 };
              
              // Apply Tier Logic from your helpers.js
              const tier = !conv.isGroup ? getTier(displayData.coinsSpent || 0) : null;

              return (
                <button 
                  key={conv.id} 
                  onClick={() => navigate(`/messages/${conv.id}`)}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-surface-1/40 transition-all border-b border-border-accent/10 text-left group"
                >
                  <div className="relative">
                    <UserAvatar 
                      src={displayData.avatar} 
                      size={56} 
                      tier={tier} 
                      isGroup={conv.isGroup} 
                    />
                    {!conv.isGroup && (
                      <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-bg-dark rounded-full shadow-lg" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`font-black text-sm truncate tracking-tight ${
                        tier?.holographic 
                          ? 'text-brand-cyan' 
                          : 'text-text-primary group-hover:text-white'
                      }`}>
                        {displayData.name}
                      </h3>
                      <span className="text-[9px] text-text-muted font-bold ml-2">
                        {conv.lastMessageAt ? timeAgo(conv.lastMessageAt.toDate()) : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {conv.lastMessageSenderId === auth.currentUser.uid && (
                        <Icon name="done_all" size={12} className="text-brand-cyan opacity-40" />
                      )}
                      <p className="text-sm text-text-muted truncate leading-none group-hover:text-text-secondary transition-colors font-medium">
                        {conv.lastMessageText || 'Tap to chat'}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}