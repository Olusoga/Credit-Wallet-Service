import knex from '../database-config/db-config';
import { UsersDTO } from '../interface/user';
class UserRepository {
    public static async createUser(data: UsersDTO): Promise<UsersDTO | null> {
        const [userId] = await knex('users').insert(data);
        const user = await knex('users').where('user_id', userId).first();
        if (user) {
            delete user.password; 
        }
        return user || null;
    }

    public static async getUsers(email: string) {
        return knex('users').where({ email: email }).select('*');
    }

    public static async getUserById(user_id: string) {
        return knex('users').where('user_id', '=', user_id).select('*');
    }
}

export default UserRepository;
