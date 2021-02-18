const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');
const riotApi = process.env.RIOTKEY;

async function combineMasteries(summoner) {
    const { data: masteryData } = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner}?api_key=${riotApi}`
    });
    const { data: championJson } = await axios({
        method: 'get',
        url: 'http://ddragon.leagueoflegends.com/cdn/11.4.1/data/en_US/champion.json'
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
    return (masteryWithChampionData);
}

router.get('/masteries', isAuthenticated, async function (req, res) {
    res.json(await combineMasteries(req.user.summoner.id));
});

router.get('/score', isAuthenticated, async function (req, res) {
    // we can pass in things in the query of a REST call!
    const data = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${req.user.summoner.id}?api_key=${riotApi}`
    });

    res.json(data.data);

});

router.post('/search/mastery', isAuthenticated, async function (req, res) {
    const query = (req.body.summoner.replace(/ /g, '%20'));
    const summonerData = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${process.env.RIOTKEY}`
    });
    res.json({
        masteries: await combineMasteries(summonerData.data.id),
        summoner: summonerData.data,
    });
});

router.post('/search/score', isAuthenticated, async function (req, res) {
    const scoreData = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${req.body.id}?api_key=${riotApi}`
    });
    res.json(scoreData.data);
});

module.exports = router;