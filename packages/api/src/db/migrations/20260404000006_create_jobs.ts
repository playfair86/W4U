import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('jobs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('consumer_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title', 200).notNullable();
    table.text('description').notNullable();
    table.string('category', 100).notNullable();
    table.string('subcategory', 100).nullable();
    table.decimal('location_lat', 10, 7).nullable();
    table.decimal('location_lng', 10, 7).nullable();
    table.decimal('budget_min', 12, 2).nullable();
    table.decimal('budget_max', 12, 2).nullable();
    table.string('timeframe', 100).nullable();
    table
      .enum('status', ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
        useNative: true,
        enumName: 'job_status_enum',
      })
      .notNullable()
      .defaultTo('OPEN');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table.index('consumer_id');
    table.index('category');
    table.index('status');
    table.index(['location_lat', 'location_lng']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('jobs');
  await knex.raw('DROP TYPE IF EXISTS job_status_enum');
}
