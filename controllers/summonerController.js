const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');

router.get('/', isAuthenticated, function (req, res) {
    // we can pass in things in the query of a REST call!
    db.Summoner.find(req.query)
        .populate('user')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.get('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findById(req.params.id)
        .populate('user')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.post('/', isAuthenticated, function (req, res) {
    const query = (req.body.name.replace(/ /g, '%20'));
    axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${process.env.RIOTKEY}`
    })
        .then(function (res) {
            const { name, puuid, accountId, id } = res.data;
            db.Summoner.create({
                name: name,
                puuid: puuid,
                accountId: accountId,
                id, id,
                user: req.user._id,
            });
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.put('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findByIdAndUpdate(req.params.id, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

router.delete('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findByIdAndDelete(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
