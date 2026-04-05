import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('phone_number', 20).unique().notNullable();
    table.string('password_hash', 255).nullable();
    table
      .enum('user_type', ['PROVIDER', 'CONSUMER', 'BOTH'], {
        useNative: true,
        enumName: 'user_type_enum',
      })
      .notNullable();
    table.string('display_name', 100).notNullable();
    table.string('language_preference', 5).notNullable().defaultTo('en');
    table
      .enum(
        'trust_tier',
        ['UNVERIFIED', 'ID_VERIFIED', 'SKILLS_VERIFIED', 'COMMUNITY_VOUCHED', 'FULLY_VETTED'],
        { useNative: true, enumName: 'trust_tier_enum' },
      )
      .notNullable()
      .defaultTo('UNVERIFIED');
    table.float('trust_score').notNullable().defaultTo(0);
    table.float('average_rating').notNullable().defaultTo(0);
    table.integer('total_reviews').notNullable().defaultTo(0);
    table.integer('total_vouches').notNullable().defaultTo(0);
    table.uuid('wallet_id').nullable();
    table.string('qr_code_url', 255).nullable();
    table.string('role', 20).notNullable().defaultTo('user');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('verified_at').nullable();
    table.boolean('is_active').notNullable().defaultTo(true);

    table.index('phone_number');
    table.index('trust_tier');
    table.index('is_active');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
  await knex.raw('DROP TYPE IF EXISTS trust_tier_enum');
  await knex.raw('DROP TYPE IF EXISTS user_type_enum');
}
