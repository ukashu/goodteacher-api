import rateLimit from 'express-rate-limit'
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";

const client = createClient();

client.on('error', (err) => { throw new Error('Redis server error') });

await client.connect();


export const rateLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  }),
})