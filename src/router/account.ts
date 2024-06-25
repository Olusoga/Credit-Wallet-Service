import express from 'express';
const router = express.Router();
import AccountController from '../controller/account.controller';

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new account
 *     tags:
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               balance:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict
 */
router.post('/register', AccountController.registerAccount);

export default router;
