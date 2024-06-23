interface IUsers {
    user_id?: string;
    email?: string;
    password?: string;
}

export class UsersDTO {
    user_id?: string;
    email: string | undefined;
    password?: string;
}
