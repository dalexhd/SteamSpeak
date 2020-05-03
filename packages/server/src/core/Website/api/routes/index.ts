import { Router } from 'express';
import authRoutes from './auth';
import verifyRoutes from './verify';

const router = Router();

router.use('/auth', authRoutes);
router.use('/verify', verifyRoutes);

export default router;
