import logger from "../../logger";

import client from ".";

const setCache = async (
  key: string,
  value: unknown,
  duration: number
): Promise<boolean> => {
  try {
    await client.setex(key, duration, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.error(`Redis Set Error - ${JSON.stringify(error)}`);
    return false;
  }
};

const getCache = async (key: string): Promise<unknown> => {
  try {
    const data = await client.get(key);
    if (data != null) {
      return JSON.parse(data);
    } else return null;
  } catch (error) {
    logger.error(`Redis Get Error - ${JSON.stringify(error)}`);
    return null;
  }
};

export { setCache, getCache };
