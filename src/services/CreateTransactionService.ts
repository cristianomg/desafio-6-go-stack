// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface CreateTransactionsServiceAttributes {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: CreateTransactionsServiceAttributes): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    if (!title || !value || !type || !category)
      throw new AppError('This request is not valid.', 400);

    const formatCategory = category.trim().toUpperCase();
    const checkIfCategoryExists = await categoryRepository.findOne({
      where: { title: formatCategory },
    });
    let category_id: string;
    if (!checkIfCategoryExists) {
      const newCategory = await categoryRepository.create({
        title: formatCategory,
      });
      categoryRepository.save(newCategory);
      category_id = newCategory.id;
    } else category_id = checkIfCategoryExists.id;

    const transaction = await transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });

    transactionsRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
