const { Router } = require('express');

const router = Router();

const authRoutes = require('./auth');
const verifyRoutes = require('./verify');

router.use('/auth', authRoutes);
router.use('/verify', verifyRoutes);

module.exports = router;
