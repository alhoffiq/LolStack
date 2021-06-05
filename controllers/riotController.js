const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');
const riotApi = process.env.RIOTKEY;

async function combineMasteries(summoner) { // Made this a function since the logic is the same between logged in summoner and searched one
    const { data: versionData } = await axios({ // Gets Data Dragon's current version array
        method: 'get',
        url: 'https://ddragon.leagueoflegends.com/api/versions.json'
    });
    const { data: masteryData } = await axios({ // Gets mastery data from given summoner
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner}?api_key=${riotApi}`
    });
    const { data: championJson } = await axios({ // Gets a static data list of all champions, url needs to be updated every time a new champion is released
        method: 'get',
        url: `http://ddragon.leagueoflegends.com/cdn/${versionData[0]}/data/en_US/champion.json` // THIS needs to be updated everytime a new champion is released -- nevermind, they have a version number api
    });

    const champions = championJson.data; // All this combines to 2 so 1 object has all the data it needs to be displayed in a card
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
    const data = await axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${req.user.summoner.id}?api_key=${riotApi}`
    });

    res.json(data.data);

});

// Separtate routes for searched summoner since data is in a slightly different format

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