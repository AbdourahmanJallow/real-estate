import { createClient } from 'redis';

const redisClient = createClient();
redisClient.on('error', (err) => console.log('🚩 Redis Client Error: ', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.log('🚩 Failed to connect to Redis: ', err);
  }
})();

export default redisClient;
