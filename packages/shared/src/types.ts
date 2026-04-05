import {
  UserType,
  TrustTier,
  WalletStatus,
  TransactionType,
  TransactionStatus,
  JobStatus,
} from './enums.js';

// --- Auth ---

export interface RegisterRequest {
  phone_number: string;
  user_type: UserType;
  display_name: string;
  language_preference?: string;
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp_code: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserPublic;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

// --- User ---

export interface UserPublic {
  id: string;
  phone_number: string;
  user_type: UserType;
  display_name: string;
  language_preference: string;
  trust_tier: TrustTier;
  trust_score: number;
  average_rating: number;
  total_reviews: number;
  total_vouches: number;
  qr_code_url: string | null;
  created_at: string;
  verified_at: string | null;
}

// --- Jobs ---

export interface CreateJobRequest {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  location: {
    lat: number;
    lng: number;
  };
  budget_min: number;
  budget_max: number;
  timeframe?: string;
}

export interface JobResponse {
  id: string;
  consumer_id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  location_lat: number;
  location_lng: number;
  budget_min: string;
  budget_max: string;
  timeframe: string | null;
  status: JobStatus;
  created_at: string;
  updated_at: string;
}

// --- Wallet ---

export interface WalletSummaryResponse {
  id: string;
  balance: string;
  status: WalletStatus;
  recent_transactions: TransactionSummary[];
}

export interface TransactionSummary {
  id: string;
  type: TransactionType;
  amount: string;
  fee: string;
  net_amount: string;
  status: TransactionStatus;
  reference: string;
  counterparty_name: string | null;
  created_at: string;
}

// --- API Response Wrapper ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
