import express from 'express';
const router = express.Router();
import TransactionController from '../controller/transaction.controller';

router.post('/transfer', TransactionController.transfer);
router.post('/fund', TransactionController.fund);
router.post('/withdraw', TransactionController.withdraw);

export default router;
