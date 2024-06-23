interface IAccount {
    account_id?: string;
    user_id?: string;
    balance?: number;
}

export class AccountDTO implements IAccount {
    account_id?: string;
    user_id?: string;
    balance?: number;
}
