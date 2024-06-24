import express from 'express';
const router = express.Router();
import AccountController from '../controller/account.controller';

router.post('/register', AccountController.registerAccount);
router.get('/:id', AccountController.getAccountById)

export default router;
