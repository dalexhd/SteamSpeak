const { Router } = require('express');
const { check, send, login } = require('../controllers/verify');

const router = Router();

router.post('/check', check);
router.post('/send', send);
router.post('/login', login);

module.exports = router;
