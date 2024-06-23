import express from 'express';
const router = express.Router();
import AccountController from '../controller/account.controller';

router.post('/register', AccountController.registerAccount);

export default router;
