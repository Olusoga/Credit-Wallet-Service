import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.uuid('user_id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('users');
}
