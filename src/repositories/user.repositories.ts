import knex from '../databaseConfig/dbConfig';
import { UsersDTO } from '../interface/user';
class UserRepository {
    public static async createUser(data: UsersDTO): Promise<UsersDTO> {
        return knex('users').insert(data);
    }

    public static async getUsers(email: string) {
        return knex('users').where({ email: email }).select('*');
    }

    public static async getUserById(user_id: string) {
        return knex('users').where('user_id', '=', user_id).select('*');
    }
}

export default UserRepository;
