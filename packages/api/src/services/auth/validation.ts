import { z } from 'zod';
import { UserType } from '@w4u/shared';

// South African E.164 format: +27XXXXXXXXX (11 digits total, starts with +27)
const saPhoneRegex = /^\+27[0-9]{9}$/;

export const registerSchema = z.object({
  phone_number: z
    .string()
    .regex(saPhoneRegex, 'Phone number must be in E.164 format starting with +27 (e.g., +27821234567)'),
  user_type: z.nativeEnum(UserType),
  display_name: z.string().min(2).max(100),
  language_preference: z.string().length(2).optional().default('en'),
});

export const verifyOtpSchema = z.object({
  phone_number: z.string().regex(saPhoneRegex),
  otp_code: z.string().length(6).regex(/^\d{6}$/, 'OTP must be 6 digits'),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

/**
 * Normalize a SA phone number to E.164 format.
 * Accepts: 0821234567, 27821234567, +27821234567
 */
export function normalizeSaPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('27') && digits.length === 11) return `+${digits}`;
  if (digits.startsWith('0') && digits.length === 10) return `+27${digits.slice(1)}`;
  if (input.startsWith('+27')) return input;
  return input;
}
