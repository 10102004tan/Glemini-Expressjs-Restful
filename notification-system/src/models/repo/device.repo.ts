/**
 * @file device.repo.ts
 * @description Repository for managing device tokens in the notification system.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */

import DeviceModel from '../device.model'

/**
 * @description find all device
 */
const findAll = async ({
    select = '*',
    where = {},
    orderBy = 'createdAt',
    order = 'desc',
    limit = 100,
}:{
    select?: string,
    where?: Record<string, any>,
    orderBy?: string,
    order?: 'asc' | 'desc',
    limit?: number
}) => {
    const foundDevices = await DeviceModel.find(where)
        .select(select === '*' ? [] : select.split(',').map(field => field.trim()))
        .sort({ [orderBy]: order === 'asc' ? 1 : -1 })
        .limit(limit)
    return foundDevices;
}

export default {
    findAll,
}