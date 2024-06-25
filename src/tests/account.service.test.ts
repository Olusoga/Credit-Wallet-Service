import  AccountServices  from '../services/account.service'; 
import AccountRepository  from '../repositories/account.repositories'; 
import UserService  from '../services/user.service';
import { AccountDTO } from '../interface/account';


jest.mock('../repositories/account.repositories', () => ({
    getAccountById: jest.fn(),
    getAccountByUserId: jest.fn(),
    createAccount: jest.fn(),
}));

jest.mock('../services/user.service', () => ({
    getUserById: jest.fn(),
}));

describe('AccountServices', () => {
    describe('getAccountById', () => {
        it('should return a 404 status and message if the account does not exist', async () => {
            (AccountRepository.getAccountById as jest.Mock).mockResolvedValue([]);

            const result = await AccountServices.getAccountById('1');
            console.log('result:', result); 

            expect(result).toEqual({ status: 404, message: 'Account with this id does not exist' });
        });

        it('should return an account if it exists', async () => {
            const account = { account_id: '1', user_id: '1', balance: 1000 };
            (AccountRepository.getAccountById as jest.Mock).mockResolvedValue([account]);

            const result = await AccountServices.getAccountById('1');
            console.log('result:', result); 

            expect(result).toEqual(account);
        });
    });

    describe('createAccount', () => {
        const accountData: AccountDTO = {
            user_id: '1',
            balance: 1000,
        };

        it('should throw an error if the user is not found', async () => {
            (UserService.getUserById as jest.Mock).mockResolvedValue([]);
            
            await expect(AccountServices.createAccount(accountData)).rejects.toEqual({
                status: 400,
                message: 'user not found',
            });
        });

        it('should throw an error if the account already exists', async () => {
            (UserService.getUserById as jest.Mock).mockResolvedValue([{}]);
            (AccountRepository.getAccountById as jest.Mock).mockResolvedValue([{}]);

            await expect(AccountServices.createAccount(accountData)).rejects.toEqual({
                status: 400,
                message: 'account already exist',
            });
        });

        it('should throw an error if an account already exists for the user', async () => {
            (UserService.getUserById as jest.Mock).mockResolvedValue([{}]);
            (AccountRepository.getAccountById as jest.Mock).mockResolvedValue([]);
            (AccountRepository.getAccountByUserId as jest.Mock).mockResolvedValue([{}]);

            await expect(AccountServices.createAccount(accountData)).rejects.toEqual({
                status: 409,
                message: 'account already exist for this user',
            });
        });

        it('should create an account if no issues are found', async () => {
            (UserService.getUserById as jest.Mock).mockResolvedValue([{}]);
            (AccountRepository.getAccountById as jest.Mock).mockResolvedValue([]);
            (AccountRepository.getAccountByUserId as jest.Mock).mockResolvedValue([]);
            (AccountRepository.createAccount as jest.Mock).mockResolvedValue({
                account_id: '1',
                user_id: '1',
                balance: 1000,
            });

            const result = await AccountServices.createAccount(accountData);

            expect(result).toEqual({
                account_id: '1',
                user_id: '1',
                balance: 1000,
            });
            expect(AccountRepository.createAccount).toHaveBeenCalledWith({
                user_id: '1',
                balance: 1000,
            });
        });
    });
});