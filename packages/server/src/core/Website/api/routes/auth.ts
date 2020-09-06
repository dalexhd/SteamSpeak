import { Router } from 'express';
import { login, find, send, refreshToken, me } from '../controllers/auth';
import { permit } from '../middlewares/permission';
import { authenticate } from '../middlewares/authentication';

const router = Router();

router.post('/login', login);
router.post('/find', find);
router.post('/send', send);

// Authenticated routes
router.use(authenticate);
router.post('/refresh-token', permit('admin'), refreshToken);
router.get('/me', permit('admin'), me);

export default router;
