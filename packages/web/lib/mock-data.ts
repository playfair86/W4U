export type TrustTier =
  | "UNVERIFIED"
  | "ID_VERIFIED"
  | "SKILLS_VERIFIED"
  | "COMMUNITY_VOUCHED"
  | "FULLY_VETTED";

export const TRUST_TIER_LABEL: Record<TrustTier, string> = {
  UNVERIFIED: "Unverified",
  ID_VERIFIED: "ID Verified",
  SKILLS_VERIFIED: "Skills Verified",
  COMMUNITY_VOUCHED: "Community Vouched",
  FULLY_VETTED: "Fully Vetted",
};

export const TRUST_TIER_RANK: Record<TrustTier, number> = {
  UNVERIFIED: 1,
  ID_VERIFIED: 2,
  SKILLS_VERIFIED: 3,
  COMMUNITY_VOUCHED: 4,
  FULLY_VETTED: 5,
};

export type Provider = {
  id: string;
  name: string;
  avatarInitial: string;
  trustTier: TrustTier;
  trustScore: number;
  averageRating: number;
  reviewCount: number;
  headline: string;
  categories: string[];
  location: string;
  completedJobs: number;
  languages: string[];
};

export type Job = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  budgetMin: number;
  budgetMax: number;
  location: string;
  distanceKm: number;
  postedBy: string;
  postedAt: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
  applicants: number;
};

export type Transaction = {
  id: string;
  type: "FUND" | "SERVICE_PAYMENT" | "TIP" | "WITHDRAWAL";
  direction: "IN" | "OUT";
  counterparty: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  timestamp: string;
  reference: string;
};

export const CURRENT_USER: Provider = {
  id: "u_sipho",
  name: "Sipho Mkhize",
  avatarInitial: "S",
  trustTier: "SKILLS_VERIFIED",
  trustScore: 78,
  averageRating: 4.7,
  reviewCount: 23,
  headline: "Professional Painter · 14 years experience",
  categories: ["Painter", "Tiling"],
  location: "Johannesburg",
  completedJobs: 52,
  languages: ["Zulu", "English", "Sesotho"],
};

export const PROVIDERS: Provider[] = [
  CURRENT_USER,
  {
    id: "u_lindiwe",
    name: "Lindiwe Khumalo",
    avatarInitial: "L",
    trustTier: "COMMUNITY_VOUCHED",
    trustScore: 91,
    averageRating: 4.9,
    reviewCount: 128,
    headline: "Cleaner & meal prep specialist",
    categories: ["Cleaner"],
    location: "Alexandra, Johannesburg",
    completedJobs: 134,
    languages: ["Zulu", "English"],
  },
  {
    id: "u_thabo",
    name: "Thabo Ndlovu",
    avatarInitial: "T",
    trustTier: "ID_VERIFIED",
    trustScore: 72,
    averageRating: 4.5,
    reviewCount: 47,
    headline: "Car Guard · Sandton City",
    categories: ["Car Guard"],
    location: "Sandton, Johannesburg",
    completedJobs: 210,
    languages: ["Sesotho", "English"],
  },
  {
    id: "u_nomsa",
    name: "Nomsa Dlamini",
    avatarInitial: "N",
    trustTier: "FULLY_VETTED",
    trustScore: 94,
    averageRating: 4.9,
    reviewCount: 89,
    headline: "Gardener & landscaper",
    categories: ["Garden"],
    location: "Tembisa, Ekurhuleni",
    completedJobs: 71,
    languages: ["Zulu", "English"],
  },
];

export const JOBS: Job[] = [
  {
    id: "j_001",
    title: "Paint 3-bedroom house interior",
    description:
      "Looking for an experienced painter to paint the interior of my 3-bedroom home in Soweto. Walls only, white paint provided. Must be able to start this weekend.",
    category: "Painter",
    subcategory: "Interior",
    budgetMin: 2500,
    budgetMax: 3500,
    location: "Orlando West, Soweto",
    distanceKm: 2.4,
    postedBy: "Sarah van der Merwe",
    postedAt: "2h ago",
    status: "OPEN",
    applicants: 4,
  },
  {
    id: "j_002",
    title: "Weekly garden maintenance",
    description:
      "Need a reliable gardener for weekly lawn mowing, edging and general tidying. Small-medium garden in Sandton.",
    category: "Garden",
    subcategory: "Lawn care",
    budgetMin: 400,
    budgetMax: 600,
    location: "Sandton, Johannesburg",
    distanceKm: 12.1,
    postedBy: "David Khumalo",
    postedAt: "5h ago",
    status: "OPEN",
    applicants: 7,
  },
  {
    id: "j_003",
    title: "Deep clean 2-bedroom apartment",
    description:
      "Once-off deep clean before move-in. Kitchen, bathroom, all floors. Cleaning supplies can be arranged.",
    category: "Cleaner",
    subcategory: "Deep clean",
    budgetMin: 600,
    budgetMax: 900,
    location: "Rosebank, Johannesburg",
    distanceKm: 8.7,
    postedBy: "Lerato Mokoena",
    postedAt: "1d ago",
    status: "OPEN",
    applicants: 11,
  },
  {
    id: "j_004",
    title: "Tile small bathroom floor",
    description:
      "Approximately 4m² bathroom floor needs re-tiling. Tiles purchased, need someone with their own tools.",
    category: "Tiling",
    subcategory: "Bathroom",
    budgetMin: 1200,
    budgetMax: 1800,
    location: "Kensington, Johannesburg",
    distanceKm: 6.3,
    postedBy: "Johan Pretorius",
    postedAt: "1d ago",
    status: "OPEN",
    applicants: 3,
  },
  {
    id: "j_005",
    title: "Help moving furniture (2-3 hours)",
    description:
      "Need 2 strong people to help move a couch, bed and boxes into a bakkie and to a new flat nearby.",
    category: "Nanny",
    subcategory: "Childcare",
    budgetMin: 350,
    budgetMax: 500,
    location: "Yeoville, Johannesburg",
    distanceKm: 4.2,
    postedBy: "Aisha Patel",
    postedAt: "3h ago",
    status: "OPEN",
    applicants: 6,
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: "t_001",
    type: "SERVICE_PAYMENT",
    direction: "IN",
    counterparty: "Sarah van der Merwe",
    amount: 850.0,
    fee: 21.25,
    netAmount: 828.75,
    status: "COMPLETED",
    timestamp: "Today, 10:42",
    reference: "Painting job — kitchen",
  },
  {
    id: "t_002",
    type: "TIP",
    direction: "IN",
    counterparty: "David Khumalo",
    amount: 50.0,
    fee: 0.75,
    netAmount: 49.25,
    status: "COMPLETED",
    timestamp: "Yesterday, 17:08",
    reference: "Thank you!",
  },
  {
    id: "t_003",
    type: "WITHDRAWAL",
    direction: "OUT",
    counterparty: "Capitec **3421",
    amount: 500.0,
    fee: 7.5,
    netAmount: 492.5,
    status: "COMPLETED",
    timestamp: "Yesterday, 09:15",
    reference: "Cash withdrawal",
  },
  {
    id: "t_004",
    type: "SERVICE_PAYMENT",
    direction: "IN",
    counterparty: "Lerato Mokoena",
    amount: 1200.0,
    fee: 30.0,
    netAmount: 1170.0,
    status: "COMPLETED",
    timestamp: "2 days ago",
    reference: "Tiling — bathroom",
  },
  {
    id: "t_005",
    type: "FUND",
    direction: "IN",
    counterparty: "FNB eWallet",
    amount: 200.0,
    fee: 0,
    netAmount: 200.0,
    status: "COMPLETED",
    timestamp: "3 days ago",
    reference: "Wallet top-up",
  },
];

export const WALLET_BALANCE = 2740.5;
export const PENDING_BALANCE = 450.0;

export const SERVICE_CATEGORIES: { name: string; icon: string; subs: string[] }[] = [
  { name: "Painter", icon: "🎨", subs: ["Interior", "Exterior", "Wallpaper"] },
  { name: "Cleaner", icon: "🧹", subs: ["Domestic", "Deep clean", "Laundry"] },
  { name: "Garden", icon: "🌿", subs: ["Lawn care", "Tree felling", "Landscaping"] },
  { name: "Car Guard", icon: "🚗", subs: ["Parking", "Car wash"] },
  { name: "Plumber", icon: "🔧", subs: ["Leaks", "Geysers", "Drains"] },
  { name: "Nanny", icon: "👶", subs: ["Childcare", "Babysitting"] },
  { name: "Electric", icon: "⚡", subs: ["Wiring", "Repairs", "Installation"] },
  { name: "Hair", icon: "💇", subs: ["Cutting", "Braiding", "Styling"] },
  { name: "Tiling", icon: "🧱", subs: ["Bathroom", "Kitchen", "Floors"] },
  { name: "Catering", icon: "🍽️", subs: ["Events", "Meal prep"] },
];

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "zu", name: "isiZulu" },
  { code: "af", name: "Afrikaans" },
  { code: "st", name: "Sesotho" },
  { code: "xh", name: "isiXhosa" },
  { code: "tn", name: "Setswana" },
  { code: "ts", name: "Xitsonga" },
  { code: "ss", name: "siSwati" },
  { code: "ve", name: "Tshivenda" },
  { code: "nr", name: "isiNdebele" },
  { code: "nso", name: "Sepedi" },
];

export type ActivityItem = {
  id: string;
  icon: string;
  text: string;
  time: string;
  amount?: number;
};

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: "a1", icon: "💰", text: "R20 tip from Sarah M.", time: "2 min ago", amount: 20 },
  { id: "a2", icon: "⭐", text: "5-star review from James K.", time: "1 hour ago" },
  { id: "a3", icon: "📩", text: "New enquiry about painting", time: "3 hours ago" },
  { id: "a4", icon: "💰", text: "R450 payment from Lerato M.", time: "Yesterday", amount: 450 },
  { id: "a5", icon: "👁️", text: "Your profile was viewed 14 times today", time: "Yesterday" },
];

export type Message = {
  id: string;
  from: string;
  avatarInitial: string;
  preview: string;
  time: string;
  unread: number;
  online?: boolean;
};

export const CONVERSATIONS: Message[] = [
  {
    id: "m1",
    from: "Sarah van der Merwe",
    avatarInitial: "S",
    preview: "Hi Sipho, can you start on Saturday morning?",
    time: "10:42",
    unread: 2,
    online: true,
  },
  {
    id: "m2",
    from: "David Khumalo",
    avatarInitial: "D",
    preview: "Thanks for the great job! Just sent you a tip.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "m3",
    from: "Lerato Mokoena",
    avatarInitial: "L",
    preview: "Perfect, see you then!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "m4",
    from: "Johan Pretorius",
    avatarInitial: "J",
    preview: "What is your rate for bathroom tiling?",
    time: "Mon",
    unread: 1,
  },
  {
    id: "m5",
    from: "Aisha Patel",
    avatarInitial: "A",
    preview: "Can you come by this weekend?",
    time: "Mon",
    unread: 0,
  },
];

export type ChatMessage = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export const CHAT_THREAD: ChatMessage[] = [
  { id: "c1", fromMe: false, text: "Hi Sipho! I saw your painting profile and I'd like to hire you for my 3-bedroom house.", time: "09:30" },
  { id: "c2", fromMe: true, text: "Hello Sarah! Thank you for reaching out. I would be happy to help. When were you thinking?", time: "09:42" },
  { id: "c3", fromMe: false, text: "This weekend if possible. I'll provide all the paint — just need the labour.", time: "09:45" },
  { id: "c4", fromMe: true, text: "Perfect. Walls only or walls and ceilings? And roughly how big are the rooms?", time: "09:47" },
  { id: "c5", fromMe: false, text: "Walls only. Standard size — around 15m² each. Budget is R2 500 – R3 500.", time: "10:02" },
  { id: "c6", fromMe: true, text: "That works for me. I can start Saturday at 8am and finish by Sunday evening.", time: "10:38" },
  { id: "c7", fromMe: false, text: "Hi Sipho, can you start on Saturday morning?", time: "10:42" },
];

export type Notification = {
  id: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "payment" | "review" | "message" | "system";
};

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", icon: "💰", title: "Payment received", body: "R828.75 from Sarah van der Merwe for painting job", time: "2m ago", read: false, kind: "payment" },
  { id: "n2", icon: "⭐", title: "New 5-star review", body: "James K. left you a glowing review — tap to see", time: "1h ago", read: false, kind: "review" },
  { id: "n3", icon: "💬", title: "New message", body: "Sarah: Hi Sipho, can you start on Saturday?", time: "2h ago", read: true, kind: "message" },
  { id: "n4", icon: "🎉", title: "Trust tier upgraded!", body: "You've been promoted to Skills Verified", time: "Yesterday", read: true, kind: "system" },
  { id: "n5", icon: "👁️", title: "Profile trending", body: "Your profile was viewed 14 times today", time: "Yesterday", read: true, kind: "system" },
  { id: "n6", icon: "💰", title: "Tip received", body: "R50 tip from David Khumalo", time: "2 days ago", read: true, kind: "payment" },
];

export type PublicReview = {
  id: string;
  reviewer: string;
  reviewerInitial: string;
  rating: number;
  text: string;
  date: string;
  job: string;
};

export const REVIEWS_OF_CURRENT_USER: PublicReview[] = [
  { id: "r1", reviewer: "Sarah van der Merwe", reviewerInitial: "S", rating: 5, text: "Excellent work on our lounge. Very professional, on time, and left everything spotless.", date: "Today", job: "Interior painting" },
  { id: "r2", reviewer: "James Kowalski", reviewerInitial: "J", rating: 5, text: "Sipho was great. Took a little longer than expected but the quality was outstanding.", date: "Last week", job: "Bathroom tiling" },
  { id: "r3", reviewer: "Lerato Mokoena", reviewerInitial: "L", rating: 5, text: "Highly recommend! Fair price and brilliant results.", date: "2 weeks ago", job: "Wall painting" },
  { id: "r4", reviewer: "David Khumalo", reviewerInitial: "D", rating: 4, text: "Good job overall. Would hire again.", date: "3 weeks ago", job: "Repair work" },
];

// Portfolio: pastel color blocks as stand-ins for work photos
export const PORTFOLIO_COLORS = [
  "from-brand-100 to-brand-200",
  "from-gold-50 to-gold-100",
  "from-brand-50 to-gold-50",
  "from-ink-100 to-brand-100",
  "from-gold-100 to-brand-100",
  "from-brand-200 to-brand-300",
];

export const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
