import knex from '../databaseConfig/dbConfig';
import { AccountDTO } from '../interface/account';
class AccountRepository {
    public static async createAccount(data: AccountDTO): Promise<AccountDTO> {
        return knex('account').insert(data);
    }

    public static async getAccountById(account_id: string) {
        return knex('account').where('account_id', '=', account_id).select(['account_id', 'user_id', 'balance']);
    }

    public static async getAccountByUserId(user_id: string) {
        return knex('account').where({ user_id: user_id }).select('');
    }

    public static async updateBalance(accountId: string, balance: number) {
        return knex('account').where('account_id', '=', accountId).update({ balance });
    }
}

export default AccountRepository;
