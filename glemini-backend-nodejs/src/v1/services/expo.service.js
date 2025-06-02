'use strict';

const { default: Expo } = require('expo-server-sdk');
const expo = require('../configs/expo.sdk.config');
const { title } = require('process');

const pushNoti = ({ somePushTokens = [], data }) => {
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

  return tickets;
};

module.exports = {
  pushNoti,
};
