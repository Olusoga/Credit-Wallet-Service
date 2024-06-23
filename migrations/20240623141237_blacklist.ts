import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.createTable('blacklist', (table: Knex.TableBuilder) => {
        table.string('email').primary().notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    return knex.schema.dropTable('blacklist');
}
