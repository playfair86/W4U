import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { strictAuthLimiter } from '../../middleware/rateLimiter';
import { registerSchema, verifyOtpSchema, refreshTokenSchema } from './validation';
import { register, verifyOtp, refresh } from './controller';

const router = Router();

router.post('/register', strictAuthLimiter, validate(registerSchema), register);
router.post('/verify-otp', strictAuthLimiter, validate(verifyOtpSchema), verifyOtp);
router.post('/refresh', validate(refreshTokenSchema), refresh);

export default router;
