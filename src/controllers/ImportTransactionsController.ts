import { Request, Response } from 'express';
import ImportTransactionsService from '../services/ImportTransactionsService';

export default class ImportTransactionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTransactionsService = new ImportTransactionsService();

    const csv = request.file.filename;

    const transactions = await importTransactionsService.execute(csv);
    return response.status(201).json(transactions);
  }
}
