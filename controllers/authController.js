const jwt = require('jsonwebtoken');
const util = require('util');
const router = require('express').Router();
const db = require('../models');
const axios = require('axios');
const signAsync = util.promisify(jwt.sign);

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({ email: email });

        if (!user) {
            res.status(400).send('User not found.');
        }
        const summoner = await db.Summoner.findOne({ name: user.name });
        const isGoodPassword = await user.validPassword(password);
        if (!isGoodPassword) {
            res.status(400).send('Invalid Password.');
        }
        // Create JWT token
        const token = await signAsync(
            { _id: user._id, email: user.email, name: user.name, summoner: summoner },
            process.env.SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        // send token and user data back. Selecting only certain parts of the user
        res.json({
            token, user: {
                _id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route for signing up a user.
// We create a user, tossing back an error fi it fails
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Try to create a user
        const user = await db.User.create({
            email,
            password,
            name
        });
        if (!user) {
            res.status(400).send('Cannot create user.');
        }

        const query = (req.body.name.replace(/ /g, '%20'));
        const riotResponse = await axios({
            method: 'get',
            url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${query}?api_key=${process.env.RIOTKEY}`
        });
        const { puuid, accountId, id } = riotResponse.data;
        const summoner = await db.Summoner.create({
            name: name,
            puuid: puuid,
            accountId: accountId,
            id, id,
            user: user._id,
        });

        // Create JWT token
        const token = await signAsync(
            { _id: user._id, email: user.email, name: user.name, summoner: summoner },
            process.env.SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        // send token and user data back. Selecting only certain parts of the user
        res.json({
            token, user: {
                _id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
