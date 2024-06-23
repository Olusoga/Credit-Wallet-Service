import express from 'express';
import UserService from '../services/user.service';

class UserController {
    public static async signup(req: express.Request, res: express.Response) {
        try {
        const result = await UserService.registerUser(req.body);
        
        if (result.status !== 201) {
        res.status(result.status).json({
        message: result.message
            });
        } else {
        res.status(201).json(result);
        }
        } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'An unexpected error occurred.';
        res.status(status).json({
        error: {
        code: error.code || 'UNEXPECTED_ERROR',
        message: message
        }
        });
        }
    }
    
    public static async login(req: express.Request, res: express.Response) {
        try {
        const result = await UserService.signIn(req.body);
        if(result.status!==200){
        res.status(result.status).json({  msg:result.message })
        }
        else {
        res.status(200).json(result)
        }
        } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'An unexpected error occurred.';
        res.status(status).json({
        error: {
        code: error.code || 'UNEXPECTED_ERROR',
        message: message
        }
        });
        }
    }
}
export default UserController;
