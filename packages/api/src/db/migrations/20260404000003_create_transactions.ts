import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('from_wallet_id').nullable().references('id').inTable('wallets');
    table.uuid('to_wallet_id').nullable().references('id').inTable('wallets');
    table
      .enum('type', ['TIP', 'SERVICE_PAYMENT', 'TRANSFER', 'FUND', 'WITHDRAW', 'ESCROW'], {
        useNative: true,
        enumName: 'transaction_type_enum',
      })
      .notNullable();
    table.decimal('amount', 12, 2).notNullable();
    table.decimal('fee', 12, 2).notNullable().defaultTo(0);
    table.decimal('net_amount', 12, 2).notNullable();
    table
      .enum('status', ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], {
        useNative: true,
        enumName: 'transaction_status_enum',
      })
      .notNullable()
      .defaultTo('PENDING');
    table.string('reference', 100).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index('from_wallet_id');
    table.index('to_wallet_id');
    table.index('status');
    table.index('created_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
  await knex.raw('DROP TYPE IF EXISTS transaction_type_enum');
  await knex.raw('DROP TYPE IF EXISTS transaction_status_enum');
}
