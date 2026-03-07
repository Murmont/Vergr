import { db, storage } from './config';
import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, addDoc,
  query, where, orderBy, limit, startAfter, onSnapshot, serverTimestamp,
  increment, arrayUnion, arrayRemove, writeBatch, runTransaction,
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
    level: 1,      // Added for Leveling System
    totalXP: 0,    // Added for Leveling System
    updatedAt: serverTimestamp(),
  });
};

/**
 * UPDATED: Tracks life-time coin spend to calculate permanent tiers
 */
export const updateUserCoins = async (uid, amount) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    coins: increment(amount),
    // Track total spent to trigger rank promotions (Diamond Apex Elite etc)
    coinsSpent: amount < 0 ? increment(Math.abs(amount)) : increment(0),
    updatedAt: serverTimestamp()
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
  batch.update(doc(db, 'users', followingId), { followingCount: increment(1) });
  await batch.commit();
};

export const unfollowUser = async (followerId, followingId) => {
  const followId = `${followerId}_${followingId}`;
  const batch = writeBatch(db);
  batch.delete(doc(db, 'follows', followId));
  batch.update(doc(db, 'users', followerId), { followingCount: increment(-1) });
  batch.update(doc(db, 'users', followingId), { followingCount: increment(-1) });
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

// ADDED: For updating media after initial creation
export const updatePostMediaUrl = async (postId, url) => {
  await updateDoc(doc(db, 'posts', postId), {
    mediaUrl: url
  });
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

export const createConversation = async (currentUser, targetUser, initialMessage) => {
  const participants = [currentUser.uid, targetUser.uid].sort();
  const ref = await addDoc(collection(db, 'conversations'), {
    participants,
    status: 'pending',
    requestedBy: currentUser.uid,
    lastMessage: initialMessage,
    lastMessageAt: serverTimestamp(),
    lastSenderId: currentUser.uid,
    createdAt: serverTimestamp(),
    metadata: {
        [currentUser.uid]: { name: currentUser.displayName, avatar: currentUser.photoURL },
        [targetUser.uid]: { name: targetUser.displayName, avatar: targetUser.avatar }
    }
  });
  return ref.id;
};

export const acceptMessageRequest = async (conversationId) => {
  await updateDoc(doc(db, 'conversations', conversationId), {
    status: 'active',
    acceptedAt: serverTimestamp()
  });
};

export const initializeConversation = async (participantId, currentUserId) => {
  try {
    const conversationsRef = collection(db, 'conversations');
    
    // Check if a conversation between these two users already exists
    const q = query(conversationsRef, where('participants', 'array-contains', currentUserId));
    const querySnapshot = await getDocs(q);
    
    const existingConversation = querySnapshot.docs.find(doc => 
      doc.data().participants.includes(participantId)
    );

    if (existingConversation) {
      return existingConversation.id;
    }

    // If not, create a new one
    const newDoc = await addDoc(conversationsRef, {
      participants: [currentUserId, participantId],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: null
    });

    return newDoc.id;
  } catch (error) {
    console.error("Error initializing conversation:", error);
    throw error;
  }
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

export const createTournament = async (adminId, squadId, { name, game, entryFee, maxParticipants, type }) => {
  const tournamentRef = await addDoc(collection(db, 'tournaments'), {
    adminId, squadId, name, game, entryFee, maxParticipants, type,
    status: 'open', prizePool: 0, participants: [],
    createdAt: serverTimestamp(),
  });
  return tournamentRef.id;
};

/**
 * Records a single round result in the subcollection
 */
export const submitRoundResult = async (matchId, currentRound, winnerId, loserId) => {
  const roundRef = doc(db, 'tournaments', matchId, 'rounds', `round_${currentRound}`);
  await setDoc(roundRef, {
    winnerId,
    loserId,
    completedAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Finalizes tournament, triggers escrow payout, and handles XP Leveling
 */
export const finalizeTournament = async (matchId, winnerId, teamId, squadId, prizePool, xpAmount) => {
  const tournamentRef = doc(db, 'tournaments', matchId);
  const transactionRef = doc(collection(db, 'transactions'));

  await runTransaction(db, async (transaction) => {
    // 1. Update tournament status
    transaction.update(tournamentRef, { 
      status: 'completed',
      winnerId: winnerId,
      finalizedAt: serverTimestamp() 
    });

    // 2. Trigger Escrow Payout
    transaction.set(transactionRef, {
      userId: winnerId,
      type: 'escrow',
      amount: prizePool || 0,
      desc: `Tournament Win: ${matchId}`,
      status: 'pending',
      createdAt: serverTimestamp(),
      unlockAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hour lock
    });
  });
  
  // 3. Trigger rewards engine
  await distributeWinRewards(winnerId, teamId, squadId, xpAmount);
};

// ═══════════════════════════════════════════
// MODERATOR
// ═══════════════════════════════════════════

/**
 * Records a moderator payout
 */
export const recordModeratorPayout = async (moderatorId, amount, tournamentId) => {
  const transactionRef = doc(collection(db, 'transactions'));
  await setDoc(transactionRef, {
    userId: moderatorId,
    type: 'mod_payout', // This is what the dashboard filters by
    amount: amount,
    tournamentId: tournamentId,
    status: 'completed',
    createdAt: serverTimestamp(),
  });
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

// ═══════════════════════════════════════════
// POLLS
// ═══════════════════════════════════════════

export const createPoll = async (uid, pollData) => {
  const pollRef = await addDoc(collection(db, 'polls'), {
    ...pollData,
    createdBy: uid,
    createdAt: serverTimestamp(),
    votes: {}, // Maps option index to count
    totalVotes: 0,
    status: 'active'
  });
  return pollRef.id;
};

export const voteOnPoll = async (pollId, optionIndex, uid) => {
  const pollRef = doc(db, 'polls', pollId);
  const userVoteRef = doc(db, 'polls', pollId, 'votes', uid);

  // Uses a transaction to ensure atomic updates to totalVotes and specific option counts
  await runTransaction(db, async (transaction) => {
    const pollDoc = await transaction.get(pollRef);
    if (!pollDoc.exists()) throw "Poll does not exist!";

    // Update global poll counts
    transaction.update(pollRef, {
      totalVotes: increment(1),
      [`votes.${optionIndex}`]: increment(1)
    });

    // Save the user's vote status
    transaction.set(userVoteRef, { 
      optionIndex, 
      votedAt: serverTimestamp() 
    });
  });
};

export const createRosterVote = async (adminId, squadId, candidateId, candidateName) => {
  return await createPoll(adminId, {
    title: `Add ${candidateName} to official roster?`,
    type: 'roster_vote',
    squadId, candidateId,
    options: ['Yes', 'No'],
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000), 
  });
};

// ═══════════════════════════════════════════
// TEAMS
// ═══════════════════════════════════════════

export const createTeam = async (ownerId, squadId, { name, tag, game, region }) => {
  const teamRef = await addDoc(collection(db, 'teams'), {
    name,
    tag,
    game,
    region,
    squadId, // THIS IS THE BRIDGE: Links the team to the Squad
    ownerId,
    roster: [ownerId],
    wins: 0,
    losses: 0,
    teamXP: 0,
    createdAt: serverTimestamp(),
  });
  
  // Optionally update squad to show they have an active official team
  await updateDoc(doc(db, 'squads', squadId), { officialTeamId: teamRef.id });
  return teamRef.id;
};

export const addPlayerToRoster = async (teamId, playerId) => {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, {
    roster: arrayUnion(playerId)
  });
};

// ═══════════════════════════════════════════
// LEVELING & REWARD ENGINE
// ═══════════════════════════════════════════

export const calculateLevel = (totalXP) => {
  if (!totalXP || totalXP <= 0) return 1;
  const level = Math.floor(totalXP / 1000) + 1; // 1000 XP per level
  return Math.min(level, 500); // 500 level cap
};

export const distributeWinRewards = async (winnerId, teamId, squadId, xpGained) => {
  const userRef = doc(db, 'users', winnerId);
  const teamRef = doc(db, 'teams', teamId);
  const squadRef = doc(db, 'squads', squadId);

  await runTransaction(db, async (transaction) => {
    const userDoc = await transaction.get(userRef);
    const userData = userDoc.data();
    const newXP = (userData.totalXP || 0) + xpGained;

    // 1. Update User
    transaction.update(userRef, { totalXP: newXP, level: calculateLevel(newXP) });

    // 2. Update Team
    transaction.update(teamRef, { teamXP: increment(xpGained), wins: increment(1) });

    // 3. Update Squad
    transaction.update(squadRef, { leaderboardPoints: increment(xpGained) });
  });
};