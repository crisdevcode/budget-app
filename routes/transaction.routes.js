import { Router } from 'express';
import { methods as transactionController } from "../controllers/transaction.controller";

const router = Router();

router.get('/', transactionController.getTransactions);
router.post('/', transactionController.addTransaction);
router.get('/:id', transactionController.getTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.put('/:id', transactionController.updateTransaction);


export default router;