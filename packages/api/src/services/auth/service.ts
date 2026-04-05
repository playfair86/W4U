import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';
import db from '../../config/database';
import { config, isDev } from '../../config';
import { AppError } from '../../middleware/errorHandler';
import { Role, TrustTier, UserType, WalletStatus } from '@w4u/shared';
import type { AuthTokenPayload } from '../../middleware/auth';

export interface UserRecord {
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
  wallet_id: string | null;
  qr_code_url: string | null;
  role: Role;
  created_at: Date;
  verified_at: Date | null;
  is_active: boolean;
}

export function generateOtpCode(): string {
  // Cryptographically random 6-digit code
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, '0');
}

export async function sendOtp(phoneNumber: string, code: string): Promise<void> {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[DEV OTP] ${phoneNumber} -> ${code}`);
    return;
  }
  // TODO: Twilio integration
  // await twilioClient.messages.create({ to: phoneNumber, from: config.twilio.phoneNumber, body: `Your W4U code is ${code}` });
}

export async function createOtpRecord(phoneNumber: string): Promise<string> {
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + config.otp.expirySeconds * 1000);

  // Invalidate any prior unverified codes for this number
  await db('otp_codes')
    .where({ phone_number: phoneNumber, verified: false })
    .update({ verified: true });

  await db('otp_codes').insert({
    phone_number: phoneNumber,
    code,
    expires_at: expiresAt,
    verified: false,
  });

  await sendOtp(phoneNumber, code);
  return code;
}

export async function verifyOtpCode(phoneNumber: string, code: string): Promise<void> {
  const record = await db('otp_codes')
    .where({ phone_number: phoneNumber, code, verified: false })
    .orderBy('created_at', 'desc')
    .first();

  if (!record) {
    throw new AppError('INVALID_OTP', 'Invalid OTP code', 400);
  }

  if (new Date(record.expires_at) < new Date()) {
    throw new AppError('OTP_EXPIRED', 'OTP code has expired', 400);
  }

  await db('otp_codes').where({ id: record.id }).update({ verified: true });
}

export async function findUserByPhone(phoneNumber: string): Promise<UserRecord | null> {
  const user = await db<UserRecord>('users').where({ phone_number: phoneNumber }).first();
  return user || null;
}

export async function createUserWithWallet(input: {
  phone_number: string;
  user_type: UserType;
  display_name: string;
  language_preference: string;
}): Promise<UserRecord> {
  return db.transaction(async (trx: Knex.Transaction) => {
    const [user] = await trx<UserRecord>('users')
      .insert({
        phone_number: input.phone_number,
        user_type: input.user_type,
        display_name: input.display_name,
        language_preference: input.language_preference,
        trust_tier: TrustTier.UNVERIFIED,
        role: Role.USER,
        verified_at: new Date(),
      })
      .returning('*');

    const [wallet] = await trx('wallets')
      .insert({
        user_id: user.id,
        balance: 0,
        status: WalletStatus.ACTIVE,
      })
      .returning('*');

    await trx('users').where({ id: user.id }).update({ wallet_id: wallet.id });

    return { ...user, wallet_id: wallet.id };
  });
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export async function createTokenPair(user: UserRecord): Promise<TokenPair> {
  const payload: AuthTokenPayload = {
    id: user.id,
    phone_number: user.phone_number,
    role: user.role,
    trust_tier: user.trust_tier,
  };

  const access_token = jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiry,
  });

  const refresh_token = jwt.sign({ id: user.id, type: 'refresh' }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiry,
  });

  const tokenHash = await bcrypt.hash(refresh_token, 10);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db('refresh_tokens').insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: expiresAt,
    revoked: false,
  });

  return { access_token, refresh_token };
}

export async function rotateRefreshToken(oldToken: string): Promise<TokenPair> {
  let payload: { id: string; type: string };
  try {
    payload = jwt.verify(oldToken, config.jwt.refreshSecret) as { id: string; type: string };
  } catch {
    throw new AppError('INVALID_REFRESH_TOKEN', 'Invalid refresh token', 401);
  }

  if (payload.type !== 'refresh') {
    throw new AppError('INVALID_REFRESH_TOKEN', 'Invalid token type', 401);
  }

  // Find and validate stored token (check hash)
  const storedTokens = await db('refresh_tokens')
    .where({ user_id: payload.id, revoked: false })
    .andWhere('expires_at', '>', new Date());

  let matchedToken: { id: string } | null = null;
  for (const stored of storedTokens) {
    if (await bcrypt.compare(oldToken, stored.token_hash)) {
      matchedToken = stored;
      break;
    }
  }

  if (!matchedToken) {
    throw new AppError('INVALID_REFRESH_TOKEN', 'Refresh token not found or revoked', 401);
  }

  // Revoke old
  await db('refresh_tokens').where({ id: matchedToken.id }).update({ revoked: true });

  const user = await db<UserRecord>('users').where({ id: payload.id }).first();
  if (!user) {
    throw new AppError('USER_NOT_FOUND', 'User not found', 404);
  }

  return createTokenPair(user);
}

export function toUserPublic(user: UserRecord) {
  return {
    id: user.id,
    phone_number: user.phone_number,
    user_type: user.user_type,
    display_name: user.display_name,
    language_preference: user.language_preference,
    trust_tier: user.trust_tier,
    trust_score: user.trust_score,
    average_rating: user.average_rating,
    total_reviews: user.total_reviews,
    total_vouches: user.total_vouches,
    qr_code_url: user.qr_code_url,
    created_at: user.created_at instanceof Date ? user.created_at.toISOString() : user.created_at,
    verified_at:
      user.verified_at instanceof Date ? user.verified_at.toISOString() : user.verified_at,
  };
}
