const { Router } = require('express');

const router = Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

module.exports = router;
