//Disable this at your own risk
module.exports = function () {
    const ACCEPTED_ENVS = ['development', 'test', 'production'];
    if (!ACCEPTED_ENVS.includes(process.env.NODE_ENV)) {
        throw new Error(`Invalid NODE_ENV in .env file. Should be one of ${ACCEPTED_ENVS.join(', ')}`);
    } else if (typeof process.env.SECRET !== 'string' || process.env.SECRET.length < 10) {
        throw new Error('Invalid Secret supplied in env. Good Secret required.');
    } else if (process.env.NODE_ENV === 'production' && (process.env.MONGODB_URI === undefined || process.env.MONGODB_URI === '')) {
        throw new Error('Production database not properly configured. Supply a URL');
    }
};