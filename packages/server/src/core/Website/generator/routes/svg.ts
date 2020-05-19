import { Router } from 'express';
import { clientDescrtiption } from '../controllers/svg';

const router = Router();

router.get('/client-description/:icon?/:appid?/:name?/:data?', clientDescrtiption);

export default router;
