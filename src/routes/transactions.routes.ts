import { Router } from 'express';

import TransactionController from '../controllers/TransactionController';
// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
const transactionController = new TransactionController();

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.index);

transactionsRouter.post('/', transactionController.create);

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
