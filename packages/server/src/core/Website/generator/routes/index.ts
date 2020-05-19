import { Router } from 'express';
import svgRoutes from './svg';

const router = Router();

router.use('/widget', svgRoutes);

export default router;
