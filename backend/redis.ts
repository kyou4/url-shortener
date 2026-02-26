import { createClient } from 'redis';
import 'dotenv/config';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

// Remove await, just call connect
redisClient.connect().catch(console.error);

export default redisClient;