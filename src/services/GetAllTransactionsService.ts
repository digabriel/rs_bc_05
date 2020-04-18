import Transaction from '../models/Transaction';
import Balance from '../interfaces/Balance';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface GetAllTransactionsResponse {
  transactions: Transaction[];
  balance: Balance;
}

class GetAllTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): GetAllTransactionsResponse {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    return { transactions, balance };
  }
}

export default GetAllTransactionsService;
