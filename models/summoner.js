const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const summonerSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Enter a name'
        },
        puuid: {
            type: String,
            trim: true,
            required: 'Enter a puuid'
        },
        accountId: {
            type: String,
            trim: true,
            required: 'Enter an accountId'
        },
        id: {
            type: String,
            trim: true,
            required: 'Enter a summonerId'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Summoner = mongoose.model('Summoner', summonerSchema);

module.exports = Summoner;
