import request from 'supertest';
import app from '../../src/application';
import AccountServices from '../../src/services/account.service';

jest.mock('../../src/services/account.service', () => ({
    createAccount: jest.fn(),
}))

describe('AccountController', ()=> {
    describe('POST /register', ()=> {
        it('should return 201 if account is created successfully', async () => {
            (AccountServices.createAccount as jest.Mock).mockResolvedValue({
                status:201,
                message: "Account created successfully"
            });

            const response = await request(app).post('/api/v1/register').send({user_id :'1', balance: 1000})
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Account created successfully, a mail has been sent to you for Email verification')
        })
    })
    
})