/**
 * @file expo.ts
 * @description channel for sending notifications via Expo Push Notifications.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
"use strict"
import DeviceService from "../services/device.service";
import ExpoService from "../services/expo.service"

const send = async (data:{
    title: string;
    body: string;
    data?: Record<string, any>;
    to: string;
}) => {
    const { title, body, data: extraData, to } = data;


    // found some push tokens

    if (!to) {
        throw new Error("user is required");
    }

    const someTokens = await DeviceService.getAllTokens({
        userId:to
    })

    try {
        const tickets = await ExpoService.push({ somePushTokens: someTokens, data: { body, title, ...extraData } });
        return tickets;
    } catch (error) {
        console.error("Error sending Expo notification:", error);
        throw error;
    }
}

export default {
    send
}