import knex from '../database-config/db-config';
import { AccountDTO } from '../interface/account';
class AccountRepository {
    public static async createAccount(data: AccountDTO): Promise<AccountDTO | null> {
       const [accountId] = await knex('account').insert(data)
       const account = await knex('account').where('account_id', accountId).first();
       return account || null
    }

    public static async getAccountById(account_id: string) {
        return knex('account').where('account_id', '=', account_id).select('*');
    }

    public static async getAccountByUserId(user_id: string) {
        return knex('account').where({ user_id: user_id }).select('');
    }

    public static async updateBalance(accountId: string, balance: number) {
        return knex('account').where('account_id', '=', accountId).update({ balance });
    }
}

export default AccountRepository;
