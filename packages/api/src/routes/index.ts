import { Router } from 'express';
import authRoutes from '../services/auth/routes';
import marketplaceRoutes from '../services/marketplace/routes';
import paymentRoutes from '../services/payment/routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/jobs', marketplaceRoutes);
router.use('/wallet', paymentRoutes);

export default router;
