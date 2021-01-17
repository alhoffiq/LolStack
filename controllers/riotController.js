const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');
const riotApi = process.env.RIOTKEY;
/**
 * Summoner - Read All
 */
router.get('/masteries', isAuthenticated, async function (req, res) {
    // we can pass in things in the query of a REST call!
    // console.log(req.user)
    const data = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.user.summoner.id}?api_key=${riotApi}`
    });

    res.json(data.data);

});

router.get('/champions', isAuthenticated, async function (req, res) {
    // we can pass in things in the query of a REST call!
    // console.log(req.user)
    const data = await axios({
        method: 'get',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json'
    });

    res.json(data.data);

});

module.exports = router;