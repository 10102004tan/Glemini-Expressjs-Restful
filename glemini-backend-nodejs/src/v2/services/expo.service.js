/**
 * @file Service for managing Expo push notifications.
 * This service provides methods to send push notifications to Expo devices,
 * @created 2025-6-3
 */
"use strict";
const { default: Expo } = require('expo-server-sdk');
const expo = require('@v1/configs/expo.sdk.config');


class ExpoService {
    /**
     * Push notifications to Expo devices.
     * @param {*} param0 
     * @returns 
     */
    static async push({
        somePushTokens = [],
        data = {
            body: '',
            title: '',
            ttl: 0,
            url: ''
        }
    }) {

        let messages = [];

        for (let pushToken of somePushTokens) {
            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }

            // Construct a message
            messages.push({
                to: pushToken,
                sound: 'default',
                body: data.body,
                title: data.title,
                ttl: data.ttl,
                data: {
                    url: data.url,
                },
                logo: 'https://banner2.cleanpng.com/20190618/y/kisspng-google-classroom-teacher-g-suite-education-school-lawson-takoa-google-classroom-1713886125563.webp',
            });
        }

        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        
        // Send the chunks to the Expo push notification service
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }

        return tickets;
    }

    /**
     *  Get Expo push token asynchronously.
     * @returns {Promise<string>} Returns the Expo push token.
     */
    static async getExpoPushToken() {
        return Expo.getExpoPushTokenAsync();
    }

    /**
     * Check if the Expo push token is valid.
     * @param {string} pushToken - The Expo push token to validate.
     * @returns {boolean} Returns true if the token is valid, otherwise false.
     */
    static isValidExpoPushToken(pushToken) {
        return Expo.isExpoPushToken(pushToken);
    }
}

module.exports = ExpoService;