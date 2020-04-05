const { Router } = require('express');
const { login, find, send, refreshToken, me } = require('../controllers/auth');
const { permit } = require('../middlewares/permission');
const { authenticate } = require('../middlewares/authentication');

const router = Router();
router.use(authenticate);

router.post('/login', login);
router.post('/find', find);
router.post('/send', send);
router.post('/refresh-token', permit('admin'), refreshToken);
router.get('/me', permit('admin'), me);

module.exports = router;
