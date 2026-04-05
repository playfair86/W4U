import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('wallets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
    table.decimal('balance', 12, 2).notNullable().defaultTo(0);
    table
      .enum('status', ['ACTIVE', 'FROZEN', 'CLOSED'], {
        useNative: true,
        enumName: 'wallet_status_enum',
      })
      .notNullable()
      .defaultTo('ACTIVE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });

  // Add FK from users.wallet_id to wallets.id
  await knex.schema.alterTable('users', (table) => {
    table.foreign('wallet_id').references('id').inTable('wallets');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropForeign('wallet_id');
  });
  await knex.schema.dropTableIfExists('wallets');
  await knex.raw('DROP TYPE IF EXISTS wallet_status_enum');
}
