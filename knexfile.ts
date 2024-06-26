import dotenv from 'dotenv';

dotenv.config();
export default {
    test: {
        client: 'mysql2',
        connection: {
            database: process.env.PGDATABASE,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
            port: Number(process.env.DB_PORT),
            ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    },

    production: {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './migrations'
        },
        seeds: {
            directory: './seeds'
        }
    }
};
