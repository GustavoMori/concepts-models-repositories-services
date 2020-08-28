import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type}: RequestDTO): Transaction {

    const { total } = this.transactionsRepository.getBalance()

    if (type === 'outcome' && total < value){
      throw Error('You dont have money enough')
    }
    if (!['income', 'outcome'].includes(type)){
      throw Error('Type is invalid')
    }
    if (value < 0){
      throw Error('Value must be positive')
    }
    if (typeof title !== 'string'){
      throw Error('Title must be a text')
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
