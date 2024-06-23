import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table: Knex.TableBuilder) => {
        table.uuid('transaction_id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('sender_id').references('account_id').inTable('account');
        table.string('receiver_id').references('account_id').inTable('account');
        table.enu('transaction_type', ['CREDIT', 'WITHDRAW', 'DEPOSIT']);
        table.bigInteger('amount').notNullable().defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
    await knex.schema.dropTable('transactions');
}
