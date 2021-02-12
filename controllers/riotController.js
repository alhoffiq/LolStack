const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');
const riotApi = process.env.RIOTKEY;
/**
 * Summoner - Read All
 */
router.get('/masteries', isAuthenticated, async function (req, res) {
    // we can pass in things in the query of a REST call!
    const { data: masteryData } = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.user.summoner.id}?api_key=${riotApi}`
    });
    const { data: championJson } = await axios({
        method: 'get',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/data/en_US/champion.json'
    });

    const champions = championJson.data;
    const championMap = new Map();

    for (const championName in champions) {
        const champion = champions[championName];
        championMap.set(champion.key, champion);
    }
    const masteryWithChampionData = masteryData.map(mastery => {
        const id = mastery.championId;
        const champion = championMap.get(`${id}`);
        return { ...mastery, champion: champion };
    });

    res.json(masteryWithChampionData);

});

router.get('/score', isAuthenticated, async function (req, res) {
    // we can pass in things in the query of a REST call!
    const data = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${req.user.summoner.id}?api_key=${riotApi}`
    });

    res.json(data.data);

});

module.exports = router;