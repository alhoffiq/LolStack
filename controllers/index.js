const router = require('express').Router();

// Import our controllers
const summonerRoutes = require('./summonerController');
const userRoutes = require('./usersController');
const authRoutes = require('./authController');
const riotRoutes = require('./riotController');

// Hook up to the router
router.use('/api/summoners', summonerRoutes);
router.use('/api/users', userRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/riot', riotRoutes);

// Export the router
module.exports = router;
