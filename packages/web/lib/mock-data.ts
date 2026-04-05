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
  name: "Sipho Ndlovu",
  avatarInitial: "S",
  trustTier: "SKILLS_VERIFIED",
  trustScore: 78,
  averageRating: 4.8,
  reviewCount: 47,
  headline: "Painting, tiling & general handyman",
  categories: ["Home & Property", "Skilled Trades"],
  location: "Soweto, Johannesburg",
  completedJobs: 52,
  languages: ["Zulu", "English", "Sesotho"],
};

export const PROVIDERS: Provider[] = [
  CURRENT_USER,
  {
    id: "u_nomsa",
    name: "Nomsa Dlamini",
    avatarInitial: "N",
    trustTier: "FULLY_VETTED",
    trustScore: 94,
    averageRating: 4.9,
    reviewCount: 128,
    headline: "Domestic worker & meal prep specialist",
    categories: ["Domestic"],
    location: "Alexandra, Johannesburg",
    completedJobs: 134,
    languages: ["Zulu", "English"],
  },
  {
    id: "u_thabo",
    name: "Thabo Molefe",
    avatarInitial: "T",
    trustTier: "COMMUNITY_VOUCHED",
    trustScore: 85,
    averageRating: 4.7,
    reviewCount: 63,
    headline: "Gardener & landscaper",
    categories: ["Garden & Outdoor"],
    location: "Tembisa, Ekurhuleni",
    completedJobs: 71,
    languages: ["Sesotho", "English", "Zulu"],
  },
];

export const JOBS: Job[] = [
  {
    id: "j_001",
    title: "Paint 3-bedroom house interior",
    description:
      "Looking for an experienced painter to paint the interior of my 3-bedroom home in Soweto. Walls only, white paint provided. Must be able to start this weekend.",
    category: "Home & Property",
    subcategory: "Painting",
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
    category: "Garden & Outdoor",
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
    category: "Domestic",
    subcategory: "Deep cleaning",
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
    category: "Skilled Trades",
    subcategory: "Tiling",
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
    category: "Community",
    subcategory: "Moving help",
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
  {
    name: "Home & Property",
    icon: "🏠",
    subs: ["Painting", "Plumbing", "Electrical", "Repairs"],
  },
  { name: "Domestic", icon: "🧺", subs: ["Cleaning", "Laundry", "Cooking"] },
  {
    name: "Garden & Outdoor",
    icon: "🌿",
    subs: ["Lawn care", "Tree felling", "Landscaping"],
  },
  { name: "Vehicle", icon: "🚗", subs: ["Car wash", "Mechanic", "Tyre fitting"] },
  { name: "Community", icon: "🤝", subs: ["Moving help", "Errands", "Events"] },
  { name: "Personal", icon: "💇", subs: ["Hair", "Beauty", "Fitness"] },
  {
    name: "Skilled Trades",
    icon: "🔧",
    subs: ["Tiling", "Welding", "Carpentry", "Roofing"],
  },
  { name: "Hospitality", icon: "🍽️", subs: ["Catering", "Serving", "Bartending"] },
];

export const formatZAR = (amount: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
