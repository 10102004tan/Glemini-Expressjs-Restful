'use strict';

const { default: Expo } = require('expo-server-sdk');
const expo = require('../configs/expo.sdk.config');

const pushNoti = ({somePushTokens=[],body='Default'}) => {
    let messages = [];
    for (let pushToken of somePushTokens) {
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: pushToken,
            sound: 'default',
            body,
            data: { withSome: 'data' },
        })
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
                // NOTE: If a ticket contains an error code in ticket.details.error, you
                // must handle it appropriately. The error codes are listed in the Expo
                // documentation:
                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            } catch (error) {
                console.error(error);
            }
        }
    })();
}

const pushNotiForUser = ({to,title,body}) => {
    console.log('Sending push notification to user');
    if (!Expo.isExpoPushToken(to)) {
        console.error(`Push token ${to} is not a valid Expo push token`);
    }

    const message = {
        to,
        sound: 'default',
        title,
        body,
        data: { withSome: 'data' },
    }

    console.log('Sending message', message);
   (
         async () => {
              try {
                let ticket = await expo.sendPushNotificationsAsync([message]);
                console.log(ticket);
              } catch (error) {
                console.error(error);
              }
         }
   )
}

module.exports = {
    pushNoti,
    pushNotiForUser
};