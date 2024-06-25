import knex from '../database-config/db-config';

class TransactionRepository {
    public static async create(data: any) {
        return knex('transactions').insert(data);
    }
}

export default TransactionRepository;
