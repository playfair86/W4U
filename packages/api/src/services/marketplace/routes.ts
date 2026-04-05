import { Router } from 'express';
import { authenticate, requireTrustTier } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { standardLimiter } from '../../middleware/rateLimiter';
import { TrustTier } from '@w4u/shared';
import { createJobSchema } from './validation';
import { postJob } from './controller';

const router = Router();

// Per spec: Unverified users can browse but cannot transact.
// Posting a job is a transaction commitment -> require ID_VERIFIED minimum.
router.post(
  '/',
  standardLimiter,
  authenticate,
  requireTrustTier(TrustTier.ID_VERIFIED),
  validate(createJobSchema),
  postJob,
);

export default router;
