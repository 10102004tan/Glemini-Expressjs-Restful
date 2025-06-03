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

const exists = async (key) => {
  return await client.exists(key);
};

const expire = async (key, seconds) => {
  return await client.expire(key, seconds);
};

const incr = async (key) => {
  return await client.incr(key);
};

const decr = async (key) => {
  return await client.decr(key);
};

module.exports = {
  set,
  get,
  del,
  exists,
  expire,
  incr,
  decr,
  client,
};
