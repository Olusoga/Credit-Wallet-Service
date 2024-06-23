import express from 'express';

const router = express.Router();
import UserController from '../controller/user.controller';

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

export default router;
