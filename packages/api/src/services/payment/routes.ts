import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { standardLimiter } from '../../middleware/rateLimiter';
import { getMyWallet } from './controller';

const router = Router();

router.get('/me', standardLimiter, authenticate, getMyWallet);

export default router;
