import AccountRepository from '../repositories/account.repositories';
import TransactionRepository from '../repositories/transaction.repositories';

class TransactionServices {
    public static async transferFunds(data: any) {
        try {
            const { sender_account_id, receiver_account_id, transaction_type, amount } = data;
            const senderAccount = await AccountRepository.getAccountById(sender_account_id);
            
            if (transaction_type === 'CREDIT') {
                const receiverAccount = await AccountRepository.getAccountById(receiver_account_id);
                if (receiverAccount.length == 0 || senderAccount.length == 0)
                    throw { status: 400, message: 'Invalid sender or receiver id' };
                if (senderAccount[0].balance < amount)
                    throw { status: 400, message: 'Insufficient funds' };
    
                const senderAccountBalance = senderAccount[0].balance - amount;
                const receiverAccountBalance = receiverAccount[0].balance + amount;
    
                await AccountRepository.updateBalance(sender_account_id, senderAccountBalance);
                await AccountRepository.updateBalance(receiver_account_id, receiverAccountBalance);
            } else if (transaction_type === 'WITHDRAW') {
                if (senderAccount[0].balance < amount)
                    throw { status: 400, message: 'Insufficient funds' };
    
                const senderAccountBalance = senderAccount[0].balance - amount;
                await AccountRepository.updateBalance(sender_account_id, senderAccountBalance);
            } else if (transaction_type === 'DEPOSIT') {
                const senderAccountBalance = senderAccount[0].balance + amount;
                await AccountRepository.updateBalance(sender_account_id, senderAccountBalance);
            }
    
            const transaction = await TransactionRepository.create(data);
            return {
                status: 200,
                message: 'Transaction successful',
               transaction
            };
        } catch (error) {
            return {
                status: error.status,
                code: error.code,
                message: error.message 
            };
        }
    }
}    
export default TransactionServices;
