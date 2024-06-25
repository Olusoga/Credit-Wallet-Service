import express from 'express';
const router = express.Router();
import TransactionController from '../controller/transaction.controller';

/**
 * @swagger
 * /transfer:
 *   post:
 *     summary: Transfer funds between accounts
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_account_id:
 *                 type: string
 *               receiver_account_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               transaction_type:
 *                 type: string
 *                 enum: [CREDIT]
 *     responses:
 *       200:
 *         description: Transaction successful
 *       400:
 *         description: Invalid transaction type or insufficient funds
 *       500:
 *         description: An unexpected error occurred
 */
router.post('/transfer', TransactionController.transfer);

/**
 * @swagger
 * /fund:
 *   post:
 *     summary: Fund an account
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_account_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               transaction_type:
 *                 type: string
 *                 enum: [DEPOSIT]
 *     responses:
 *       200:
 *         description: Fund successful
 *       400:
 *         description: Invalid transaction type
 *       500:
 *         description: An unexpected error occurred
 */
router.post('/fund', TransactionController.fund);

/**
 * @swagger
 * /withdraw:
 *   post:
 *     summary: Withdraw funds from an account
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_account_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               transaction_type:
 *                 type: string
 *                 enum: [WITHDRAW]
 *     responses:
 *       200:
 *         description: Withdraw successful
 *       400:
 *         description: Invalid transaction type or insufficient funds
 *       500:
 *         description: An unexpected error occurred
 */
router.post('/withdraw', TransactionController.withdraw);

export default router;
