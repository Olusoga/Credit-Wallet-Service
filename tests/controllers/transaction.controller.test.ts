import request from 'supertest';
import app from '../../src/application';
import TransactionServices from "../../src/services/transaction.service";

jest.mock('../../src/services/transaction.service', () => ({
    transferFunds: jest.fn(),
}))

describe('AccountController', () => {
    describe('POST /transfer', () => {
        it('should return 200 if transfer is successful', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockResolvedValue({
                status: 200,
                message: 'Transaction successful'
            });

            const response = await request(app).post('/api/v1/transfer').send({
                sender_account_id: '1',
                receiver_account_id: '2',
                amount: 100,
                transaction_type: 'CREDIT'
            });

            expect(response.status).toBe(200);
            expect(response.body).toBe('Transaction successful');
        });

        it('should return 400 for invalid transaction type', async () => {
            const response = await request(app).post('/api/v1/transfer').send({
                sender_account_id: '1',
                receiver_account_id: '2',
                amount: 100,
                transaction_type: 'INVALID'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('invalid transaction type');
        });

        it('should return error if transfer fails', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockRejectedValue({
                status: 500,
                message: 'An unexpected error occurred.'
            });

            const response = await request(app).post('/api/v1/transfer').send({
                sender_account_id: '1',
                receiver_account_id: '2',
                amount: 100,
                transaction_type: 'CREDIT'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('An unexpected error occurred.');
        });
    });

    describe('POST /fund', () => {
        it('should return 200 if fund is successful', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockResolvedValue({
                status: 200,
                message: 'Transaction successful'
            });

            const response = await request(app).post('/api/v1/fund').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'DEPOSIT'
            });

            expect(response.status).toBe(200);
            expect(response.body).toBe('Transaction successful');
        });

        it('should return 400 for invalid transaction type', async () => {
            const response = await request(app).post('/api/v1/fund').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'INVALID'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('invalid transaction type');
        });

        it('should return error if fund fails', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockRejectedValue({
                status: 500,
                message: 'An unexpected error occurred.'
            });

            const response = await request(app).post('/api/v1/fund').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'DEPOSIT'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('An unexpected error occurred.');
        });
    });

    describe('POST /withdraw', () => {
        it('should return 200 if withdraw is successful', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockResolvedValue({
                status: 200,
                message: 'Transaction successful'
            });

            const response = await request(app).post('/api/v1/withdraw').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'WITHDRAW'
            });

            expect(response.status).toBe(200);
            expect(response.body).toBe('Transaction successful');
        });

        it('should return 400 for invalid transaction type', async () => {
            const response = await request(app).post('/api/v1/withdraw').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'INVALID'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('invalid transaction type');
        });

        it('should return error if withdraw fails', async () => {
            (TransactionServices.transferFunds as jest.Mock).mockRejectedValue({
                status: 500,
                message: 'An unexpected error occurred.'
            });

            const response = await request(app).post('/api/v1/withdraw').send({
                sender_account_id: '1',
                amount: 100,
                transaction_type: 'WITHDRAW'
            });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('An unexpected error occurred.');
        });
    });
});
