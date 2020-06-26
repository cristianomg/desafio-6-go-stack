// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(transactionId: string): Promise<void> {
    if (!transactionId) throw new AppError('This id is not valid.', 400);
    const transactionRepo = getCustomRepository(TransactionsRepository);
    const transaction = await transactionRepo.findOne({
      where: { id: transactionId },
    });
    if (!transaction) throw new AppError('This transaction not found.');
    await transactionRepo.remove(transaction);
  }
}

export default DeleteTransactionService;
