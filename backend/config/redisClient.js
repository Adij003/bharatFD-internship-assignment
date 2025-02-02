const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});

client.connect()
  .then(() => console.log('✅ Redis connected'))
  .catch(err => console.error('Redis connection error:', err));

module.exports = client;
