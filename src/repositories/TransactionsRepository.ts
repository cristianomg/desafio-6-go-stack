import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const { income, outcome, total } = transactions.reduce(
      (acc: Balance, current) => {
        switch (current.type) {
          case 'income':
            acc.income += current.value;
            acc.total += current.value;
            break;
          case 'outcome':
            acc.outcome += current.value;
            acc.total -= current.value;
            break;
          default:
            break;
        }
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    // TODO
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
