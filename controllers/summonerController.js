const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
const axios = require('axios');
/**
 * Summoner - Read All
 */
router.get('/', isAuthenticated, function (req, res) {
    // we can pass in things in the query of a REST call!
    console.log(req.user);
    db.Summoner.find(req.query)
        .populate('user')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Summoner - Read One
 */
router.get('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findById(req.params.id)
        .populate('user')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Summoner - Create
 * Notice how we are also taking in the User Id! Important!
 * We need the isAuthenticated middleware in the route to have a user in the request
 */
router.post('/', isAuthenticated, function (req, res) {
    const query = (req.body.name.replace(/ /g, '%20'));
    axios({
        method: 'get',
        url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${process.env.RIOTKEY}`
    })
        .then(function (res) {
            const { name, puuid, accountId, id } = res.data;
            console.log('Name: ' + name);
            console.log('puuid: ' + puuid);
            console.log('accountId: ' + accountId);
            console.log('id: ' + id);
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

/**
 * Summoner - Update
 */
router.put('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findByIdAndUpdate(req.params.id, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Summoner - Delete
 */
router.delete('/:id', isAuthenticated, function (req, res) {
    db.Summoner.findByIdAndDelete(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

module.exports = router;
