import request from 'supertest';
import app from '../../src/application';
import UserService from '../../src/services/user.service';

jest.mock('../../src/services/user.service', () => ({
    registerUser: jest.fn(),
    signIn: jest.fn(),
}));

describe('UserController', () => {
    describe('POST /signup', () => {
        it('should return 201 if user is created successfully', async () => {
            (UserService.registerUser as jest.Mock).mockResolvedValue({
                status: 201,
                message: 'User created successfully',
            });

            const response = await request(app).post('/api/v1/signup').send({ email: 'test@example.com', password: 'password' });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created successfully');
        });

        it('should return error if user creation fails', async () => {
            (UserService.registerUser as jest.Mock).mockResolvedValue({
                status: 400,
                message: 'User already exists',
            });

            const response = await request(app).post('/api/v1/signup').send({ email: 'test@example.com', password: 'password' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('User already exists');
        });
    });

    describe('POST /login', () => {
        it('should return 200 if login is successful', async () => {
            (UserService.signIn as jest.Mock).mockResolvedValue({
                status: 200,
                message: 'Login successful',
                data: { token: 'jwt-token' },
            });

            const response = await request(app).post('/api/v1/login').send({ email: 'test@example.com', password: 'password' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.data.token).toBe('jwt-token');
        });

        it('should return error if login fails', async () => {
            (UserService.signIn as jest.Mock).mockResolvedValue({
                status: 400,
                message: 'Invalid credentials',
            });

            const response = await request(app).post('/api/v1/login').send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(response.status).toBe(400);
            expect(response.body.msg).toBe('Invalid credentials');
        });
    });
});