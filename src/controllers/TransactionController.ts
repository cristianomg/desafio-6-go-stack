import { Request, Response } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

export default class TransactionController {
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
