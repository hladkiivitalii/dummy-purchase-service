const redis = require('../redis/client');
const generate_key = (req) => {
    const path = req.originalUrl;
    return `${path}}`;
};
module.exports.get = async (req) => {
    const key = generate_key(req);
    const res = await redis.get(key);
    return JSON.parse(res)
};

module.exports.set = async (req, data) => {
    const key = generate_key(req);
    return redis.set(key, JSON.stringify(data));
};