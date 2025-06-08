/**
 * @file device.service.ts
 * @description Service for managing device tokens in the notification system.
 * @author 10102004tan
 * @created 2025-06-08
 * @updated 2025-06-08
 */
import DeviceRepo from "../models/repo/device.repo";

const DeviceService = {
  getAllTokens: async ({ userId }: { userId: string }): Promise<string[]> => {
    try {
      const foundDevices = await DeviceRepo.findAll({
        where: {
          user_id: userId,
        },
      });
      const someTokens = foundDevices
        .map((device) => device.device_token)
        .filter((token): token is string => typeof token === "string");
      return someTokens;
    } catch (error) {
      console.error("Failed to get device tokens:", error);
      throw new Error(`Failed to get device tokens:`);
    }
  },
};

export default DeviceService;
