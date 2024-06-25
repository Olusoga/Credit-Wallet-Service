import express from 'express';
const router = express.Router();
import UserController from '../controller/user.controller';

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: An unexpected error occurred
 */
router.post('/signup', UserController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login an existing user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: An unexpected error occurred
 */
router.post('/login', UserController.login);

export default router;
