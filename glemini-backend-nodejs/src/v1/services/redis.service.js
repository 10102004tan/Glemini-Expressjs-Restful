'use strict';

const { getRedis } = require('../databases/init.redis');
const { instanceRedis: client } = getRedis();

const set = async (key, value, expireSeconds = null) => {
  if (expireSeconds) {
    await client.set(key, JSON.stringify(value), {
      EX: expireSeconds,
    });
  } else {
    await client.set(key, JSON.stringify(value));
  }
};

const get = async (key) => {
  let data;
  try {
    data = await client.get(key);
    if (data === null || data === undefined) return data;
    return JSON.parse(data);
  } catch (err) {
    console.error(`redis:::Error parsing JSON for key: ${key}`, err);
    return data;
  }
};

const del = async (key) => {
  return await client.del(key);
};

const pushToList = async (key, value) => {
  await client.lPush(key, JSON.stringify(value));
};

const popOldestFromList = async (key) => {
  const data = await client.rPop(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return data;
  }
};

const pushToListQuizSearchRecent = async (userId, key, count = 10) => {
  try {
    const redisKey = `QUIZ_SEARCH_RECENT_${userId}`;

    const existingKeys = await client.lRange(redisKey, 0, -1);
    if (existingKeys.includes(key)) {
      await client.lRem(redisKey, 0, key);
    }

    await client.lPush(redisKey, key);
    // Limit the list to the most recent 10 items
    await client.lTrim(redisKey, 0, count - 1);
  } catch (error) {
    console.log("error",error)
  }
};

const getListByKey = async (key) => {
  const data = await client.lRange(key, 0, -1);
  return data.map(item => {
    try {
      return JSON.parse(item);
    }
    catch (err) {
      console.error(`Error parsing JSON for key: ${key}`, err);
      return item;
    }
  });
};

const getKeySearchRecent = async (userId) => {
  const redisKey = `QUIZ_SEARCH_RECENT_${userId}`;
  const data = await client.lRange(redisKey, 0, -1);
  if (!data || data.length === 0) {
    return [];
  }
  console.log("data", data);
  return data;
};

const delListByKey = async (key) => {
  const data = await client.lRange(key, 0, -1);
  if (data && data.length > 0) {
    await client.del(key);
  }
};

module.exports = {
  set,
  get,
  del,
  pushToList,
  popOldestFromList,
  pushToListQuizSearchRecent,
  getListByKey,
  getKeySearchRecent,
  delListByKey
};
