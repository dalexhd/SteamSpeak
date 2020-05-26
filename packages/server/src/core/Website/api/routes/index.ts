import { Router } from 'express';
import authRoutes from './auth';
import verifyRoutes from './verify';
import widgetRoutes from './widget';
import { shorten } from '../controllers/shorten';

const router = Router();

router.use('/auth', authRoutes);
router.use('/verify', verifyRoutes);
router.use('/verify', widgetRoutes);
router.use('/s/:hash', shorten);

export default router;
