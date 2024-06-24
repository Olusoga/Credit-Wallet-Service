import  UserServices  from '../services/user.service';
import UserRepository from '../repositories/user.repositories';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


jest.mock('../repositories/user.repositories');
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedGetUsers = UserRepository.getUsers as jest.MockedFunction<typeof UserRepository.getUsers>;
const mockedCreateUsers = UserRepository.createUser as jest.MockedFunction<typeof UserRepository.createUser>;
describe('UserService.registerUser', () => {
    const mockUserData = {
      email: 'test@example.com',
      password: 'password123',
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should register a new user successfully', async () => {
        mockedGetUsers.mockResolvedValue([]);
        mockedCreateUsers.mockResolvedValue({
        email: mockUserData.email,
        user_id: 'user-id-1',
      });
  
      // Mock bcrypt.hash with jest.fn()
      bcrypt.hash = jest.fn().mockResolvedValue('hashed-password');
  
      mockedAxios.get.mockResolvedValue({
        data: {
          status: 'success',
          message: 'Successful',
          data: null,
        },
      });
  
      const result = await UserServices.registerUser(mockUserData);
  
      expect(result.status).toBe(201);
      expect(result.data.email).toBe(mockUserData.email);
      expect(UserRepository.getUsers).toHaveBeenCalledWith(mockUserData.email);
      expect(UserRepository.createUser).toHaveBeenCalled();
      //expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, expect.any(Number));
    });
  
  
    it('should return an error if email already exists', async () => {
        mockedGetUsers.mockResolvedValue([mockUserData]);
  
      const result = await UserServices.registerUser(mockUserData);
  
      expect(result.status).toBe(400);
      expect(result.message).toBe('Email already taken');
    });
  });

  describe('signIn', () => {
    it('should throw an error if the user does not exist', async () => {
      UserRepository.getUsers = jest.fn().mockResolvedValue([]);

      await expect(UserServices.signIn({ email: 'test@example.com', password: 'password' }))
        .rejects
        .toEqual({ status: 400, code: 'EMAIL_NOT_EXIST', message: 'user account does not exist, please register' });
    });

    it('should throw an error if the password is incorrect', async () => {
      UserRepository.getUsers = jest.fn().mockResolvedValue([{ user_id: '1', email: 'test@example.com', password: 'hashedpassword' }]);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await expect(UserServices.signIn({ email: 'test@example.com', password: 'password' }))
        .rejects
        .toEqual({ status: 400, code: 'BAD_REQUEST', message: 'Incorrect password.' });
    });

    it('should return auth data if the password is correct', async () => {
      UserRepository.getUsers = jest.fn().mockResolvedValue([{ user_id: '1', email: 'test@example.com', password: 'hashedpassword' }]);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('token');

      const result = await UserServices.signIn({ email: 'test@example.com', password: 'password' });

      expect(result).toEqual({
        status: 200,
        data: {
          user_id: '1',
          email: 'test@example.com',
          token: 'token',
        },
        message: 'User login successfully.',
      });
    });
  });

  describe('getUserById', () => {
    it('should throw an error if the user does not exist', async () => {
      UserRepository.getUserById = jest.fn().mockResolvedValue([]);

      await expect(UserServices.getUserById('1')).rejects.toThrow('User not found');
    });

    it('should return the user if the user exists', async () => {
      const user = { user_id: '1', email: 'test@example.com', password: 'hashedpassword' };
      UserRepository.getUserById = jest.fn().mockResolvedValue([user]);

      const result = await UserServices.getUserById('1');

      expect(result).toEqual([user]);
    });
  });
