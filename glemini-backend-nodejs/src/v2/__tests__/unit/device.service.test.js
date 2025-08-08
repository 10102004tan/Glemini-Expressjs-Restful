const { InternalServerError } = require("@v1/cores/error.repsone");

// Mock các hàm repo
jest.mock("@v2/models/repo/device.repo", () => ({
  createDevice: jest.fn(),
  findTokensByUserId: jest.fn(),
  deleteDeviceToken: jest.fn()
}));

const {
  createDevice,
  findTokensByUserId,
  deleteDeviceToken
} = require("@v2/models/repo/device.repo");

const DeviceService = require("@v2/services/device.service");

describe("DeviceService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createDevice", () => {
    test("should create device successfully", async () => {
      const mockDevice = { id: "1", deviceToken: "abc123" };
      createDevice.mockResolvedValue(mockDevice);

      const result = await DeviceService.createDevice({
        userId: "u1",
        deviceToken: "abc123",
        deviceOs: "Android"
      });

      expect(result).toEqual(mockDevice);
      expect(createDevice).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "u1",
          deviceToken: "abc123",
          deviceOs: "Android",
          deviceName: "unknown",
          lastLoggedInAt: expect.any(Number)
        })
      );
    });

    test("should throw InternalServerError when createDevice fails", async () => {
      createDevice.mockResolvedValue(null);

      await expect(
        DeviceService.createDevice({
          userId: "u1",
          deviceToken: "abc123",
          deviceOs: "Android"
        })
      ).rejects.toThrow(new InternalServerError("failed!!!"));
    });
  });

  describe("deleteDevice", () => {
    test("should call deleteDeviceToken with correct params", async () => {
      deleteDeviceToken.mockResolvedValue({ deletedCount: 1 });

      const result = await DeviceService.deleteDevice({
        userId: "u1",
        deviceToken: "abc123"
      });

      expect(result).toEqual({ deletedCount: 1 });
      expect(deleteDeviceToken).toHaveBeenCalledWith({
        userId: "u1",
        deviceToken: "abc123"
      });
    });
  });

  describe("findAllTokenByUserId", () => {
    test("should return array of device tokens", async () => {
      findTokensByUserId.mockResolvedValue([
        { device_token: "token1" },
        { device_token: "token2" }
      ]);

      const result = await DeviceService.findAllTokenByUserId("u1");

      expect(result).toEqual(["token1", "token2"]);
      expect(findTokensByUserId).toHaveBeenCalledWith("u1");
    });

    test("should return empty array if no tokens found", async () => {
      findTokensByUserId.mockResolvedValue([]);

      const result = await DeviceService.findAllTokenByUserId("u1");

      expect(result).toEqual([]);
    });
  });
});
