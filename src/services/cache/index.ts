import Redis from "ioredis";

import config from "../../config";

const client = new Redis({ port: config.REDIS.PORT, host: config.REDIS.HOST });

export default client;
