const redis = require('redis');
const redis_client = redis.createClient({
    port:6379,
    host:'46.101.208.229',
    password: 'redis'
});

redis_client.on('error', (error) => {
    console.error(error);
});

const get = async (key) => {
    return new Promise((resolve, reject) => {
        redis_client.get(key, (error, result) => {
            if (!error) {
                console.log('get from cache');
                resolve(result)
            }
            console.error(error);
            reject(error)
        })
    })
};

const set = async (key, data) => {
  return new Promise((resolve, reject) => {
      redis_client.set(key, data, (error, result) => {
          if (!error) {
              console.log('set to cache');
              resolve(result)
          }
          console.error(error);
          reject(error)
      })
  })
};

module.exports = {
    set, get
};