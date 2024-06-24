import AccountRepository from '../repositories/account.repositories';
import UserService from './user.service';
import { AccountDTO } from '../interface/account';

class AccountServices {
    public static async getAccountById(account_id: string) {
        const account = await AccountRepository.getAccountById(account_id);
        if (account.length === 0) return { status: 404, message: 'Account with this id does not exist' };
        return account[0];
    }

    public static async createAccount(AccountDTO: AccountDTO) {
        const user = await UserService.getUserById(AccountDTO.user_id as any);
        if (!user[0]) {
            throw { status: 400, message: 'user not found' };
        } else {
            const accountId = typeof AccountDTO.account_id !== 'undefined' ? AccountDTO.account_id : null;
            const account = await AccountRepository.getAccountById(accountId as any);
            if (account.length > 0) throw { status: 400, message: 'account already exist' };
        }

        const accountUser = await AccountRepository.getAccountByUserId(AccountDTO.user_id as any);

        if (accountUser.length > 0) throw { status: 409, message: 'account already exist for this user' };
        const AccountData = {
            user_id: AccountDTO.user_id,
            balance: AccountDTO.balance
        };

        return AccountRepository.createAccount(AccountData);
       
    }
}

export default AccountServices;
