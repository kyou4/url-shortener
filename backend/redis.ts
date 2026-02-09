import { createClient } from 'redis';
import 'dotenv/config'
const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD})
  .on("error", (err) => console.log("Redis Client Error", err))
  .on("connect", () => console.log("Connected to Redis"));

await redisClient.connect();

export default redisClient;