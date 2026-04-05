import { Request, Response, NextFunction } from 'express';
import { isDev } from '../../config';
import { AppError } from '../../middleware/errorHandler';
import {
  createOtpRecord,
  verifyOtpCode,
  findUserByPhone,
  createUserWithWallet,
  createTokenPair,
  rotateRefreshToken,
  toUserPublic,
} from './service';
import type { RegisterInput, VerifyOtpInput, RefreshTokenInput } from './validation';

export async function register(
  req: Request<unknown, unknown, RegisterInput>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { phone_number } = req.body;

    const existing = await findUserByPhone(phone_number);
    if (existing && existing.is_active) {
      // Still send OTP — this also functions as login flow for existing users
    }

    const code = await createOtpRecord(phone_number);

    res.status(200).json({
      success: true,
      data: {
        message: 'OTP sent',
        phone_number,
        ...(isDev && { dev_otp_code: code }),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(
  req: Request<unknown, unknown, VerifyOtpInput & { user_type?: string; display_name?: string; language_preference?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { phone_number, otp_code } = req.body;

    await verifyOtpCode(phone_number, otp_code);

    let user = await findUserByPhone(phone_number);
    if (!user) {
      // First-time registration: need user_type and display_name
      const { user_type, display_name, language_preference } = req.body;
      if (!user_type || !display_name) {
        throw new AppError(
          'REGISTRATION_INCOMPLETE',
          'user_type and display_name required for new users',
          400,
        );
      }
      user = await createUserWithWallet({
        phone_number,
        user_type: user_type as never,
        display_name,
        language_preference: language_preference || 'en',
      });
    }

    const tokens = await createTokenPair(user);

    res.status(200).json({
      success: true,
      data: {
        ...tokens,
        user: toUserPublic(user),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function refresh(
  req: Request<unknown, unknown, RefreshTokenInput>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tokens = await rotateRefreshToken(req.body.refresh_token);
    res.status(200).json({ success: true, data: tokens });
  } catch (err) {
    next(err);
  }
}
