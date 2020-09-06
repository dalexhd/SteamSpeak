import { Router } from 'express';
import { index } from '../controllers/logs';
// import { permit } from '../middlewares/permission';
import { authenticate } from '../middlewares/authentication';

const router = Router();
router.use(authenticate);

router.get('', index);

export default router;
