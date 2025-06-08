/**
 * @file expo.service.ts
 * @description Service for sending push notifications using Expo.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
"use strict";

import { Expo, ExpoPushMessage } from "expo-server-sdk";
const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true,
});

const ExpoService = {
  push: async ({
    somePushTokens=[],
    data = {
      body: "",
      title: "",
      ttl: 0,
      url: "",
    },
  }:{
    somePushTokens: string[];
    data: {
      body: string;
      title: string;
      ttl?: number;
      url?: string;
    };
  }) => {
    let messages:ExpoPushMessage[] = [];

    for (let pushToken of somePushTokens) {

      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message
      messages.push({
        to: pushToken,
        sound: "default",
        body: data.body,
        title: data.title,
        ttl: data.ttl,
        data: {
          url: data.url,
        },
        // logo: "https://banner2.cleanpng.com/20190618/y/kisspng-google-classroom-teacher-g-suite-education-school-lawson-takoa-google-classroom-1713886125563.webp",
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
  },
};

export default ExpoService;
