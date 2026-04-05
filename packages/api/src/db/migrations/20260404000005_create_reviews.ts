import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('reviews', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('reviewer_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('provider_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('transaction_id').nullable().references('id').inTable('transactions');
    table.integer('overall_rating').notNullable();
    table.integer('punctuality').nullable();
    table.integer('quality').nullable();
    table.integer('communication').nullable();
    table.integer('value_for_money').nullable();
    table.text('comment').nullable();
    table.text('provider_response').nullable();
    table.boolean('is_flagged').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table.index('provider_id');
    table.index('reviewer_id');
  });

  // Constraint: comment required if overall_rating < 3
  await knex.raw(`
    ALTER TABLE reviews ADD CONSTRAINT check_comment_required
    CHECK (overall_rating >= 3 OR (comment IS NOT NULL AND length(comment) >= 20))
  `);

  // Constraint: ratings between 1-5
  await knex.raw(`
    ALTER TABLE reviews ADD CONSTRAINT check_rating_range
    CHECK (overall_rating >= 1 AND overall_rating <= 5)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('reviews');
}
