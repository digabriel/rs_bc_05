import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid transaction type. Must be income or outcome.');
    }

    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error("Can't create this transaction. You dont have balance");
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
