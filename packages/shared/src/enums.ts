export enum UserType {
  PROVIDER = 'PROVIDER',
  CONSUMER = 'CONSUMER',
  BOTH = 'BOTH',
}

export enum TrustTier {
  UNVERIFIED = 'UNVERIFIED',
  ID_VERIFIED = 'ID_VERIFIED',
  SKILLS_VERIFIED = 'SKILLS_VERIFIED',
  COMMUNITY_VOUCHED = 'COMMUNITY_VOUCHED',
  FULLY_VETTED = 'FULLY_VETTED',
}

export enum VerificationType {
  ID_DOCUMENT = 'ID_DOCUMENT',
  SELFIE_MATCH = 'SELFIE_MATCH',
  QUALIFICATION = 'QUALIFICATION',
  BACKGROUND_CHECK = 'BACKGROUND_CHECK',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
  MANUAL_REVIEW = 'MANUAL_REVIEW',
}

export enum WalletStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
}

export enum TransactionType {
  TIP = 'TIP',
  SERVICE_PAYMENT = 'SERVICE_PAYMENT',
  TRANSFER = 'TRANSFER',
  FUND = 'FUND',
  WITHDRAW = 'WITHDRAW',
  ESCROW = 'ESCROW',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum JobStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum Role {
  USER = 'user',
  PROVIDER = 'provider',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}
