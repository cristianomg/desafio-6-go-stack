import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import TransactionController from '../controllers/TransactionController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

const transactionController = new TransactionController();
const importTransactionsController = new ImportTransactionsController();

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.index);

transactionsRouter.post('/', transactionController.create);

transactionsRouter.delete('/:id', transactionController.delete);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
