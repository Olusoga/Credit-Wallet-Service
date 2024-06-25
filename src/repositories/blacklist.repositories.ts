import knex from '../database-config/db-config';

class BlacklistRepository {
    public static async isBlacklisted(email: string): Promise<boolean> {
        const result = await knex('blacklist').where({ email }).first();
        return !!result;
    }
}
export default BlacklistRepository;