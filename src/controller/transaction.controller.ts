import express from 'express';
import TransactionServices from '../services/transaction.service';

class AccountController {
    public static async transfer(req: express.Request, res: express.Response) {
        try {
            const { sender_account_id, receiver_account_id, amount, transaction_type } = req.body
            if( transaction_type !=='CREDIT' ) throw { message : "invalid transaction type" };
            const result = await TransactionServices.transferFunds({ sender_account_id, receiver_account_id, amount, transaction_type });

            res.status(result.status).json(result.message);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'An unexpected error occurred.';
            res.status(status).json({
                message: message
            });
        }
    }

    public static async fund(req: express.Request, res: express.Response) {
        try {
            const { sender_account_id, amount, transaction_type } = req.body
            if( transaction_type !=='DEPOSIT' ) throw { message : "invalid transaction type" };
            const result = await TransactionServices.transferFunds({ sender_account_id, amount, transaction_type });

            res.status(result.status).json(result.message);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'An unexpected error occurred.';
            res.status(status).json({
                message: message
            });
        }
    }
    public static async withdraw(req: express.Request, res: express.Response) {
        try {
            const { sender_account_id, amount, transaction_type } = req.body
            if( transaction_type !=='WITHDRAW' ) throw { message : "invalid transaction type" };
            const result = await TransactionServices.transferFunds({ sender_account_id, amount, transaction_type });

            res.status(result.status).json(result.message);
        } catch (error) {
            const status = error.status || 500;
            const message = error.message || 'An unexpected error occurred.';
            res.status(status).json({
                message: message
            });
        }
    }
}
export default AccountController;
