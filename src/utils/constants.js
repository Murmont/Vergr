// Demo data used when Firebase isn't connected
export const DEMO_USER = {
  uid: 'demo-user-001',
  email: 'gamer@vergr.gg',
  username: 'NeonBlade',
  displayName: 'Alex Storm',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade&backgroundColor=0F1118',
  banner: null,
  bio: '⚡ FPS enjoyer | Twitch Partner | Squad Leader',
  coins: 2450,
  coinsSpent: 780,
  tier: 'Gold',
  followers: 12400,
  following: 342,
  isCreator: true,
  isVerified: true,
  interests: ['FPS', 'RPG', 'Battle Royale', 'Esports'],
  linkedAccounts: { twitch: 'NeonBlade_TV', discord: 'NeonBlade#1337', youtube: null, steam: 'neonblade' },
  createdAt: new Date('2024-06-15'),
};

export const DEMO_POSTS = [
  {
    id: 'post-001',
    authorId: 'demo-user-001',
    author: { username: 'NeonBlade', displayName: 'Alex Storm', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', isVerified: true, tier: 'Gold' },
    content: 'Just dropped a 30-bomb in ranked 🔥 The new meta is absolutely insane. Who else is grinding tonight?',
    mediaUrls: [],
    type: 'text',
    likes: 284,
    comments: 47,
    shares: 12,
    tags: ['valorant', 'ranked', 'gaming'],
    createdAt: new Date(Date.now() - 3600000),
    isLiked: false,
  },
  {
    id: 'post-002',
    authorId: 'user-002',
    author: { username: 'PixelQueen', displayName: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', isVerified: true, tier: 'Diamond' },
    content: 'New stream setup is finally complete! Going live tonight at 8PM EST — come hang out and watch me get destroyed in Elden Ring DLC 😂',
    mediaUrls: ['https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600'],
    type: 'image',
    likes: 1203,
    comments: 89,
    shares: 34,
    tags: ['streaming', 'eldenring', 'setup'],
    createdAt: new Date(Date.now() - 7200000),
    isLiked: true,
  },
  {
    id: 'post-003',
    authorId: 'user-003',
    author: { username: 'FragMaster', displayName: 'Jake Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', isVerified: false, tier: 'Silver' },
    content: 'Tournament starts in 2 hours. Squad is locked in. Let\'s get this bread 🏆',
    mediaUrls: [],
    type: 'text',
    likes: 56,
    comments: 23,
    shares: 5,
    tags: ['tournament', 'esports', 'squad'],
    createdAt: new Date(Date.now() - 10800000),
    isLiked: false,
  },
  {
    id: 'post-004',
    authorId: 'user-004',
    author: { username: 'LootGoblin', displayName: 'Maya Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LootGoblin', isVerified: false, tier: 'Platinum' },
    type: 'poll',
    content: 'Best game of 2024 so far?',
    pollOptions: [
      { id: 1, text: 'Elden Ring DLC', votes: 342, percentage: 38 },
      { id: 2, text: 'Helldivers 2', votes: 289, percentage: 32 },
      { id: 3, text: 'Final Fantasy VII Rebirth', votes: 156, percentage: 17 },
      { id: 4, text: 'Palworld', votes: 113, percentage: 13 },
    ],
    totalVotes: 900,
    likes: 445,
    comments: 112,
    shares: 67,
    tags: ['poll', 'goty', 'gaming'],
    createdAt: new Date(Date.now() - 18000000),
    isLiked: false,
  },
];

export const DEMO_STORIES = [
  { id: 's1', username: 'You', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', isOwn: true, hasNew: false },
  { id: 's2', username: 'PixelQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', isOwn: false, hasNew: true, isLive: true },
  { id: 's3', username: 'FragMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', isOwn: false, hasNew: true },
  { id: 's4', username: 'LootGoblin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LootGoblin', isOwn: false, hasNew: true },
  { id: 's5', username: 'ShadowFox', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowFox', isOwn: false, hasNew: false },
  { id: 's6', username: 'ArcticWolf', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArcticWolf', isOwn: false, hasNew: true },
];

export const DEMO_SQUADS = [
  { id: 'sq1', name: 'Apex Predators', game: 'Apex Legends', avatar: '🎯', members: 128, isPrivate: false },
  { id: 'sq2', name: 'Valo Gang', game: 'Valorant', avatar: '⚔️', members: 64, isPrivate: true },
  { id: 'sq3', name: 'Elden Lords', game: 'Elden Ring', avatar: '🗡️', members: 256, isPrivate: false },
];

export const DEMO_NOTIFICATIONS = [
  { id: 'n1', type: 'like', content: 'PixelQueen liked your post', read: false, createdAt: new Date(Date.now() - 300000) },
  { id: 'n2', type: 'follow', content: 'FragMaster started following you', read: false, createdAt: new Date(Date.now() - 900000) },
  { id: 'n3', type: 'coins', content: 'You earned 50 coins from daily quest!', read: true, createdAt: new Date(Date.now() - 3600000) },
  { id: 'n4', type: 'squad', content: 'Apex Predators squad challenge starts in 1 hour', read: true, createdAt: new Date(Date.now() - 7200000) },
];

export const DEMO_QUESTS = [
  { id: 'q1', title: 'Daily Login', description: 'Log in to VERGR', reward: 10, type: 'daily', completed: true, progress: 1, target: 1 },
  { id: 'q2', title: 'Post Engagement', description: 'Like 5 posts', reward: 25, type: 'daily', completed: false, progress: 3, target: 5 },
  { id: 'q3', title: 'Watch a Stream', description: 'Watch any stream for 10 minutes', reward: 30, type: 'daily', completed: false, progress: 0, target: 1 },
  { id: 'q4', title: 'Squad Activity', description: 'Send a message in any squad', reward: 15, type: 'daily', completed: false, progress: 0, target: 1 },
  { id: 'q5', title: 'Content Creator', description: 'Create 3 posts this week', reward: 100, type: 'weekly', completed: false, progress: 1, target: 3 },
  { id: 'q6', title: 'Social Butterfly', description: 'Follow 10 new people this week', reward: 75, type: 'weekly', completed: false, progress: 4, target: 10 },
  { id: 'q7', title: 'Refer a Friend', description: 'Invite a friend who signs up', reward: 500, type: 'special', completed: false, progress: 0, target: 1 },
];

export const GAMING_INTERESTS = [
  'FPS', 'RPG', 'Battle Royale', 'MOBA', 'MMO', 'Sports', 'Racing',
  'Fighting', 'Strategy', 'Simulation', 'Horror', 'Indie', 'Puzzle',
  'Platformer', 'Survival', 'Open World', 'Esports', 'Speedrunning',
  'Retro Gaming', 'Mobile Gaming', 'VR Gaming', 'Streaming', 'Game Dev',
];

export const FOLLOW_SUGGESTIONS = [
  { uid: 'fs1', username: 'DrDisrespect', displayName: 'Dr Disrespect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrDisrespect', bio: 'The Two-Time 🏆', followers: 45000, isVerified: true, tier: 'Diamond' },
  { uid: 'fs2', username: 'Valkyrae', displayName: 'Valkyrae', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valkyrae', bio: 'Content Creator & Gamer', followers: 38000, isVerified: true, tier: 'Diamond' },
  { uid: 'fs3', username: 'Shroud', displayName: 'Shroud', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud', bio: 'FPS Legend', followers: 62000, isVerified: true, tier: 'Diamond' },
  { uid: 'fs4', username: 'Pokimane', displayName: 'Pokimane', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pokimane', bio: 'Variety streamer ✨', followers: 55000, isVerified: true, tier: 'Platinum' },
  { uid: 'fs5', username: 'AceuFPS', displayName: 'Aceu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AceuFPS', bio: 'Movement god', followers: 28000, isVerified: true, tier: 'Gold' },
];
