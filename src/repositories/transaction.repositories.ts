import knex from '../databaseConfig/dbConfig';

class TransactionRepository {
    public static async create(data: any) {
        return knex('transactions').insert(data);
    }
}

export default TransactionRepository;
