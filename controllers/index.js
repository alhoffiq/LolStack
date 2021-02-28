const router = require('express').Router();

const summonerRoutes = require('./summonerController');
const userRoutes = require('./usersController');
const authRoutes = require('./authController');
const riotRoutes = require('./riotController');

router.use('/api/summoners', summonerRoutes);
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/riot', riotRoutes);

module.exports = router;
