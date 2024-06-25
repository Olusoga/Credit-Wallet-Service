import AccountServices from '../../src/services/transaction.service';
import AccountRepository  from '../../src/repositories/account.repositories'; 
import  TransactionRepository  from '../../src/repositories/transaction.repositories';

jest.mock('../../src/repositories/account.repositories', () => ({
    getAccountById: jest.fn(),
    updateBalance: jest.fn(),
}));

jest.mock('../../src/repositories/transaction.repositories', () => ({
    create: jest.fn(),
}));

describe('AccountServices', () => {
    describe('transferFunds', () => {
        const transactionData = {
            sender_account_id: '1',
            receiver_account_id: '2',
            transaction_type: 'CREDIT',
            amount: 100,
        };

        it('should throw an error if sender or receiver account is invalid', async () => {
            (AccountRepository.getAccountById as jest.Mock)
                .mockResolvedValueOnce([]) 
                .mockResolvedValueOnce([]); 

            const result = await AccountServices.transferFunds(transactionData);

            expect(result).toEqual({
                status: 400,
                message: 'Invalid sender or receiver id',
            });
        });

        it('should throw an error if sender has insufficient funds', async () => {
            (AccountRepository.getAccountById as jest.Mock)
                .mockResolvedValueOnce([{ balance: 50 }]) 
                .mockResolvedValueOnce([{ balance: 200 }]);

            const result = await AccountServices.transferFunds(transactionData);

            expect(result).toEqual({
                status: 400,
                message: 'Insufficient funds',
            });
        });

        it('should transfer funds for a CREDIT transaction', async () => {
            (AccountRepository.getAccountById as jest.Mock)
                .mockResolvedValueOnce([{ balance: 200 }]) 
                .mockResolvedValueOnce([{ balance: 100 }]); 

            (TransactionRepository.create as jest.Mock).mockResolvedValue(transactionData);

            const result = await AccountServices.transferFunds(transactionData);

            expect(result).toEqual({
                status: 200,
                message: 'Transaction successful',
                transaction: transactionData,
            });

            expect(AccountRepository.updateBalance).toHaveBeenCalledWith('1', 100);
            expect(AccountRepository.updateBalance).toHaveBeenCalledWith('2', 200);
        });

        it('should withdraw funds for a WITHDRAW transaction', async () => {
            const withdrawData = { ...transactionData, transaction_type: 'WITHDRAW' };

            (AccountRepository.getAccountById as jest.Mock)
                .mockResolvedValueOnce([{ balance: 200 }]); 

            (TransactionRepository.create as jest.Mock).mockResolvedValue(withdrawData);

            const result = await AccountServices.transferFunds(withdrawData);

            expect(result).toEqual({
                status: 200,
                message: 'Transaction successful',
                transaction: withdrawData,
            });

            expect(AccountRepository.updateBalance).toHaveBeenCalledWith('1', 100);
        });

        it('should deposit funds for a DEPOSIT transaction', async () => {
            const depositData = { ...transactionData, transaction_type: 'DEPOSIT' };

            (AccountRepository.getAccountById as jest.Mock)
                .mockResolvedValueOnce([{ balance: 100 }]); 

            (TransactionRepository.create as jest.Mock).mockResolvedValue(depositData);

            const result = await AccountServices.transferFunds(depositData);

            expect(result).toEqual({
                status: 200,
                message: 'Transaction successful',
                transaction: depositData,
            });

            expect(AccountRepository.updateBalance).toHaveBeenCalledWith('1', 200);
        });
    });
});