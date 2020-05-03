import { Router } from 'express';
import { check, send, login } from '../controllers/verify';

const router = Router();

router.post('/check', check);
router.post('/send', send);
router.post('/login', login);

export default router;
