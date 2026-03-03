import { db, storage } from './config';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, addDoc,
  query, where, orderBy, limit, startAfter, onSnapshot, serverTimestamp,
  increment, arrayUnion, arrayRemove, writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// ═══════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════

export const getUser = async (uid) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const getUserByUsername = async (username) => {
  const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
};

export const updateUser = async (uid, data) => {
  await updateDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() });
};

export const completeOnboarding = async (uid, { username, displayName, bio, gameTags, linkedAccounts }) => {
  await updateDoc(doc(db, 'users', uid), {
    username,
    displayName,
    bio: bio || '',
    gameTags: gameTags || [],
    linkedAccounts: linkedAccounts || {},
    isOnboarded: true,
    updatedAt: serverTimestamp(),
  });
};

export const subscribeToUser = (uid, callback) => {
  return onSnapshot(doc(db, 'users', uid), (snap) => {
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null);
  });
};

// ═══════════════════════════════════════════
// FOLLOWS
// ═══════════════════════════════════════════

export const followUser = async (followerId, followingId) => {
  const followId = `${followerId}_${followingId}`;
  const batch = writeBatch(db);
  batch.set(doc(db, 'follows', followId), {
    followerId,
    followingId,
    createdAt: serverTimestamp(),
  });
  batch.update(doc(db, 'users', followerId), { followingCount: increment(1) });
  batch.update(doc(db, 'users', followingId), { followerCount: increment(1) });
  await batch.commit();
};

export const unfollowUser = async (followerId, followingId) => {
  const followId = `${followerId}_${followingId}`;
  const batch = writeBatch(db);
  batch.delete(doc(db, 'follows', followId));
  batch.update(doc(db, 'users', followerId), { followingCount: increment(-1) });
  batch.update(doc(db, 'users', followingId), { followerCount: increment(-1) });
  await batch.commit();
};

export const isFollowing = async (followerId, followingId) => {
  const snap = await getDoc(doc(db, 'follows', `${followerId}_${followingId}`));
  return snap.exists();
};

export const getFollowers = async (uid, limitCount = 20) => {
  const q = query(collection(db, 'follows'), where('followingId', '==', uid), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const userIds = snap.docs.map(d => d.data().followerId);
  const users = await Promise.all(userIds.map(id => getUser(id)));
  return users.filter(Boolean);
};

export const getFollowing = async (uid, limitCount = 20) => {
  const q = query(collection(db, 'follows'), where('followerId', '==', uid), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const userIds = snap.docs.map(d => d.data().followingId);
  const users = await Promise.all(userIds.map(id => getUser(id)));
  return users.filter(Boolean);
};

// ═══════════════════════════════════════════
// POSTS
// ═══════════════════════════════════════════

export const createPost = async (authorId, { content, type = 'text', mediaUrls = [], hashtags = [], pollOptions = [] }) => {
  const postRef = await addDoc(collection(db, 'posts'), {
    authorId,
    content,
    type,
    mediaUrls,
    hashtags,
    pollOptions: pollOptions.map(opt => ({ text: opt, votes: 0 })),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    saveCount: 0,
    status: 'published',
    rankScore: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await updateDoc(doc(db, 'users', authorId), { postCount: increment(1) });
  return postRef.id;
};

export const getFeedPosts = async (limitCount = 20, lastDoc = null) => {
  let q = query(collection(db, 'posts'), where('status', '==', 'published'), orderBy('createdAt', 'desc'), limit(limitCount));
  if (lastDoc) q = query(q, startAfter(lastDoc));
  const snap = await getDocs(q);
  const posts = [];
  for (const d of snap.docs) {
    const post = { id: d.id, ...d.data(), _doc: d };
    const author = await getUser(post.authorId);
    post.author = author;
    posts.push(post);
  }
  return posts;
};

export const getUserPosts = async (uid, limitCount = 20) => {
  const q = query(collection(db, 'posts'), where('authorId', '==', uid), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const likePost = async (postId, userId) => {
  const batch = writeBatch(db);
  batch.set(doc(db, 'posts', postId, 'likes', userId), { createdAt: serverTimestamp() });
  batch.update(doc(db, 'posts', postId), { likeCount: increment(1) });
  await batch.commit();
};

export const unlikePost = async (postId, userId) => {
  const batch = writeBatch(db);
  batch.delete(doc(db, 'posts', postId, 'likes', userId));
  batch.update(doc(db, 'posts', postId), { likeCount: increment(-1) });
  await batch.commit();
};

export const hasLikedPost = async (postId, userId) => {
  const snap = await getDoc(doc(db, 'posts', postId, 'likes', userId));
  return snap.exists();
};

// ═══════════════════════════════════════════
// COMMENTS
// ═══════════════════════════════════════════

export const getComments = async (postId, limitCount = 20) => {
  const q = query(collection(db, 'posts', postId, 'comments'), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const comments = [];
  for (const d of snap.docs) {
    const comment = { id: d.id, ...d.data() };
    comment.author = await getUser(comment.authorId);
    comments.push(comment);
  }
  return comments;
};

export const addComment = async (postId, authorId, content) => {
  const ref = await addDoc(collection(db, 'posts', postId, 'comments'), {
    authorId,
    content,
    likeCount: 0,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, 'posts', postId), { commentCount: increment(1) });
  return ref.id;
};

// ═══════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════

export const getNotifications = async (uid, limitCount = 30) => {
  const q = query(collection(db, 'notifications'), where('recipientId', '==', uid), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const subscribeToNotifications = (uid, callback) => {
  const q = query(collection(db, 'notifications'), where('recipientId', '==', uid), orderBy('createdAt', 'desc'), limit(30));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const markNotificationRead = async (notifId) => {
  await updateDoc(doc(db, 'notifications', notifId), { read: true });
};

export const markAllNotificationsRead = async (uid) => {
  const q = query(collection(db, 'notifications'), where('recipientId', '==', uid), where('read', '==', false));
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach(d => batch.update(d.ref, { read: true }));
  await batch.commit();
};

// ═══════════════════════════════════════════
// CONVERSATIONS / MESSAGES
// ═══════════════════════════════════════════

export const getConversations = async (uid) => {
  const q = query(collection(db, 'conversations'), where('participants', 'array-contains', uid), orderBy('lastMessageAt', 'desc'));
  const snap = await getDocs(q);
  const convos = [];
  for (const d of snap.docs) {
    const convo = { id: d.id, ...d.data() };
    const otherIds = convo.participants.filter(id => id !== uid);
    convo.otherUsers = await Promise.all(otherIds.map(id => getUser(id)));
    convos.push(convo);
  }
  return convos;
};

export const getMessages = async (convoId, limitCount = 50) => {
  const q = query(collection(db, 'conversations', convoId, 'messages'), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })).reverse();
};

export const sendMessage = async (convoId, senderId, content, type = 'text') => {
  const batch = writeBatch(db);
  const msgRef = doc(collection(db, 'conversations', convoId, 'messages'));
  batch.set(msgRef, { senderId, content, type, createdAt: serverTimestamp() });
  batch.update(doc(db, 'conversations', convoId), {
    lastMessage: content,
    lastMessageAt: serverTimestamp(),
    lastSenderId: senderId,
  });
  await batch.commit();
};

export const subscribeToMessages = (convoId, callback) => {
  const q = query(collection(db, 'conversations', convoId, 'messages'), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
};

export const createConversation = async (participantIds) => {
  const ref = await addDoc(collection(db, 'conversations'), {
    participants: participantIds,
    lastMessage: null,
    lastMessageAt: serverTimestamp(),
    lastSenderId: null,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

// ═══════════════════════════════════════════
// WALLET
// ═══════════════════════════════════════════

export const getWallet = async (uid) => {
  const snap = await getDoc(doc(db, 'wallets', uid));
  return snap.exists() ? snap.data() : { balance: 0, totalEarned: 0, totalSpent: 0 };
};

export const subscribeToWallet = (uid, callback) => {
  return onSnapshot(doc(db, 'wallets', uid), (snap) => {
    callback(snap.exists() ? snap.data() : { balance: 0, totalEarned: 0, totalSpent: 0 });
  });
};

export const getTransactions = async (uid, limitCount = 30) => {
  const q = query(collection(db, 'transactions'), where('userId', '==', uid), orderBy('createdAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ═══════════════════════════════════════════
// COIN PACKAGES
// ═══════════════════════════════════════════

export const getCoinPackages = async () => {
  const q = query(collection(db, 'coin_packages'), where('active', '==', true), orderBy('sortOrder', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ═══════════════════════════════════════════
// SQUADS
// ═══════════════════════════════════════════

export const getSquads = async (limitCount = 20) => {
  const q = query(collection(db, 'squads'), where('isPublic', '==', true), orderBy('memberCount', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getUserSquads = async (uid) => {
  // Get squads where user is a member via member subcollection
  // For now query all squads and filter client-side (Firestore doesn't support subcollection membership queries directly)
  const q = query(collection(db, 'squads'), orderBy('memberCount', 'desc'), limit(50));
  const snap = await getDocs(q);
  const squads = [];
  for (const d of snap.docs) {
    const memberSnap = await getDoc(doc(db, 'squads', d.id, 'members', uid));
    if (memberSnap.exists()) {
      squads.push({ id: d.id, ...d.data() });
    }
  }
  return squads;
};

export const createSquad = async (ownerId, { name, description, game, isPublic, avatar }) => {
  const squadRef = await addDoc(collection(db, 'squads'), {
    name,
    description: description || '',
    game,
    isPublic: isPublic !== false,
    avatar: avatar || null,
    memberCount: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await setDoc(doc(db, 'squads', squadRef.id, 'members', ownerId), {
    userId: ownerId,
    role: 'owner',
    joinedAt: serverTimestamp(),
  });
  return squadRef.id;
};

export const getSquadChat = async (squadId, limitCount = 50) => {
  const q = query(collection(db, 'squads', squadId, 'chat'), orderBy('createdAt', 'asc'), limit(limitCount));
  const snap = await getDocs(q);
  const messages = [];
  for (const d of snap.docs) {
    const msg = { id: d.id, ...d.data() };
    msg.author = await getUser(msg.authorId);
    messages.push(msg);
  }
  return messages;
};

export const sendSquadMessage = async (squadId, authorId, content) => {
  await addDoc(collection(db, 'squads', squadId, 'chat'), {
    authorId,
    content,
    createdAt: serverTimestamp(),
  });
};

// ═══════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════

export const getProducts = async (category = null, limitCount = 20) => {
  let q;
  if (category && category !== 'All') {
    q = query(collection(db, 'products'), where('active', '==', true), where('category', '==', category), orderBy('createdAt', 'desc'), limit(limitCount));
  } else {
    q = query(collection(db, 'products'), where('active', '==', true), orderBy('createdAt', 'desc'), limit(limitCount));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getProduct = async (productId) => {
  const snap = await getDoc(doc(db, 'products', productId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// ═══════════════════════════════════════════
// STREAMS
// ═══════════════════════════════════════════

export const getLiveStreams = async (limitCount = 20) => {
  const q = query(collection(db, 'streams'), where('isLive', '==', true), orderBy('viewerCount', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const streams = [];
  for (const d of snap.docs) {
    const stream = { id: d.id, ...d.data() };
    stream.streamer = await getUser(stream.streamerId);
    streams.push(stream);
  }
  return streams;
};

export const createStream = async (streamerId, { title, game, platforms }) => {
  const ref = await addDoc(collection(db, 'streams'), {
    streamerId,
    title,
    game,
    platforms: platforms || ['vergr'],
    isLive: true,
    viewerCount: 0,
    chatEnabled: true,
    tipsEnabled: true,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

// ═══════════════════════════════════════════
// TOURNAMENTS
// ═══════════════════════════════════════════

export const getTournaments = async (status = null, limitCount = 20) => {
  let q;
  if (status && status !== 'All') {
    q = query(collection(db, 'tournaments'), where('status', '==', status.toLowerCase()), orderBy('startDate', 'asc'), limit(limitCount));
  } else {
    q = query(collection(db, 'tournaments'), orderBy('startDate', 'desc'), limit(limitCount));
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

// ═══════════════════════════════════════════
// LEADERBOARDS
// ═══════════════════════════════════════════

export const getLeaderboard = async (boardId = 'players', limitCount = 50) => {
  const boardDoc = await getDoc(doc(db, 'leaderboards', boardId));
  if (!boardDoc.exists()) return [];
  const q = query(collection(db, 'leaderboards', boardId, 'entries'), orderBy('score', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const entries = [];
  for (const d of snap.docs) {
    const entry = { id: d.id, ...d.data() };
    entry.user = await getUser(entry.userId || entry.id);
    entries.push(entry);
  }
  return entries;
};

// ═══════════════════════════════════════════
// FILE UPLOADS
// ═══════════════════════════════════════════

export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const uploadAvatar = async (uid, file) => {
  return uploadFile(`users/${uid}/avatar/${file.name}`, file);
};

export const uploadBanner = async (uid, file) => {
  return uploadFile(`users/${uid}/banner/${file.name}`, file);
};

export const uploadPostMedia = async (postId, file) => {
  return uploadFile(`posts/${postId}/${file.name}`, file);
};

// ═══════════════════════════════════════════
// APP CONFIG
// ═══════════════════════════════════════════

export const getAppConfig = async () => {
  const snap = await getDoc(doc(db, 'app_config', 'general'));
  return snap.exists() ? snap.data() : {};
};

// ═══════════════════════════════════════════
// EXPLORE / SEARCH
// ═══════════════════════════════════════════

export const searchUsers = async (searchTerm, limitCount = 10) => {
  // Firestore doesn't support full-text search, so we do prefix match on username
  const q = query(
    collection(db, 'users'),
    where('username', '>=', searchTerm.toLowerCase()),
    where('username', '<=', searchTerm.toLowerCase() + '\uf8ff'),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const getTrendingPosts = async (limitCount = 20) => {
  const q = query(collection(db, 'posts'), where('status', '==', 'published'), orderBy('rankScore', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  const posts = [];
  for (const d of snap.docs) {
    const post = { id: d.id, ...d.data() };
    post.author = await getUser(post.authorId);
    posts.push(post);
  }
  return posts;
};
