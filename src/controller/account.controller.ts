import express from 'express';
import AccountService from '../services/account.service';

class AccountController {
    public static async registerAccount(req: express.Request, res: express.Response) {
        try {
        const user = await AccountService.createAccount(req.body);

        if (user)
        return res.status(201).json({
        data: user,
        msg: 'Account created successfully, a mail has been sent to you for Email verification'
        });
        res.status(500).json({ msg: 'error' });
        } catch (error) {
            res.status(500).json({ msg: error });
        }
    }
}
export default AccountController;
