"use strict"
const kvStoreModel = require('../kvStore.model');

const set = async (key, value, expiresAt) => {
    const kvStore = await kvStoreModel.findOneAndUpdate(
        { key },
        { value, expiresAt },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    return kvStore;
}

const get = async (key) => {
    const kvStore = await kvStoreModel.findOne({ key }).lean()
    if (!kvStore) return null;
    return kvStore.value;
}

const remove = async (key) => {
    const kvStore = await kvStoreModel.findOneAndDelete({ key })
    return kvStore;
}

const removeAll = async () => {
    const kvStore = await kvStoreModel.deleteMany({})
    return kvStore;
}

module.exports = {
    set,
    get,
    remove,
    removeAll
}