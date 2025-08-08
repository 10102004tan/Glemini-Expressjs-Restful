// src/v2/__tests__/unit/access.service.test.js
const AccessService = require('../../services/access.service');

jest.mock('@v1/services/redis.service', () => ({
  set: jest.fn().mockResolvedValue(true),
}));

jest.mock('@v1/models/repositories/user.repo', () => ({
  findUserById: jest.fn().mockResolvedValue({ user_id: '671c99d1b74c0e3f9035d5c9' }),
  findUserByEmailV2: jest.fn(),
  createUser: jest.fn().mockResolvedValue({
    user_id: '671c99d1b74c0e3f9035d5c9',
    user_email: 'test@example.com',
    user_fullname: 'Test User',
    user_password: 'hashed_password',
  }),
}));

jest.mock('@v1/models/repositories/role.repo', () => ({
  findRoleByName: jest.fn()
}));

jest.mock('@v2/services/device.service', () => ({
  deleteDevice: jest.fn().mockResolvedValue({ success: true }),
}));

//storeKeyToken
jest.mock('@v1/services/keyToken.service', () => ({
  storeKeyToken: jest.fn(),
}));

const { set } = require('@v1/services/redis.service');
const { findUserById, findUserByEmailV2,createUser} = require('@v1/models/repositories/user.repo');
const DeviceService = require('@v2/services/device.service');
const { findRoleByName } = require('@v1/models/repositories/role.repo');
const KeyTokenService = require('@v1/services/keyToken.service');

describe('AccessService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logout', () => {
    it('should call redis.set with correct parameters', async () => {
      const mockUser = { user_id: '671c99d1b74c0e3f9035d5c9', jit: 'jit-token' };
      const mockDeviceToken = 'device-token-123';

      const result = await AccessService.logout({
        user: mockUser,
        deviceToken: mockDeviceToken,
      });

      expect(findUserById).toHaveBeenCalledWith('671c99d1b74c0e3f9035d5c9');

      expect(set).toHaveBeenCalledTimes(1);
      expect(set).toHaveBeenCalledWith(
        `TOKEN_BLACK_LIST_${mockUser.user_id}_${mockUser.jit}`,
        1,
        60 * 60 * 24 * 2,
      );

      expect(DeviceService.deleteDevice).toHaveBeenCalledTimes(1);
      expect(DeviceService.deleteDevice).toHaveBeenCalledWith({
        userId: mockUser.user_id,
        deviceToken: mockDeviceToken,
      });

      expect(result).toEqual(true);
    });

    it('should throw an error if user is not found', async () => {
      findUserById.mockResolvedValue(null);

      await expect(
        AccessService.logout({
          user: { user_id: '671c99d1b74c0e3f9035d5c9', jit: 'jit-token' },
          deviceToken: 'device-token-123',
        }),
      ).rejects.toThrow('user not found!!!');
    });

    it('should throw an error if redis.set fails', async () => {
      set.mockRejectedValue(new Error('Redis error'));
        findUserById.mockResolvedValue({user_id: '671c99d1b74c0e3f9035d5c9'});
      await expect(
        AccessService.logout({
          user: { user_id: '671c99d1b74c0e3f9035d5c9', jit: 'jit-token' },
          deviceToken: 'device-token-123',
        }),
      ).rejects.toThrow('Redis error');
    });
  });


  describe('signup',()=>{
    it('should throw an error if user already exists', async () => {
      const email = 'test@example.com';
      findUserByEmailV2.mockResolvedValue({ user_id: '671c99d1b74c0e3f9035d5c9', email });
      await expect(AccessService.signup({ email })).rejects.toThrow('email is already used');
    });

    it('should throw an error if role user is not provided',async()=>{
        const email = 'test@example.com';
        findUserByEmailV2.mockResolvedValue(null);
        findRoleByName.mockResolvedValue(null);
        await expect(AccessService.signup({ email,password:"12345678",fullname:"Test User" })).rejects.toThrow('fail to get role !!!');
    });

    it('should create a new user and return user data', async () => {
      const fullname = 'Test User';
      const email = 'test@example.com';
      const password = '12345678';

      findUserByEmailV2.mockResolvedValue(null);
      findRoleByName.mockResolvedValue({ _id: '671c99d1b74c0e3f9035d5c9' });
      KeyTokenService.storeKeyToken.mockResolvedValue({
        public_key: 'public-key',
        private_key: 'private-key',
        user_id: '671c99d1b74c0e3f9035d5c9',
      });
      createUser.mockResolvedValue({
        user_id: '671c99d1b74c0e3f9035d5c9',
        user_email: email,
        user_fullname: fullname,
      });

      const result = await AccessService.signup({ email, password, fullname });

      expect(result).toEqual({
        user_id: '671c99d1b74c0e3f9035d5c9',
        user_email: email,
        user_fullname: fullname,
      });
      expect(findUserByEmailV2).toHaveBeenCalledWith(email);
      expect(findRoleByName).toHaveBeenCalledWith('user');
    });
})
  });
