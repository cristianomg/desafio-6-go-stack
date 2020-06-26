import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

export default class TransactionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const transactionRepo = getCustomRepository(TransactionsRepository);
    const transactions = await transactionRepo.find();
    const balance = await transactionRepo.getBalance();
    return response.json({ transactions, balance });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category } = request.body;
    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      title,
      value,
      type,
      category,
    });
    return response.status(201).json(transaction);
  }
}
