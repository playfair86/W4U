import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('verifications', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table
      .enum('type', ['ID_DOCUMENT', 'SELFIE_MATCH', 'QUALIFICATION', 'BACKGROUND_CHECK'], {
        useNative: true,
        enumName: 'verification_type_enum',
      })
      .notNullable();
    table
      .enum('status', ['PENDING', 'PROCESSING', 'VERIFIED', 'FAILED', 'MANUAL_REVIEW'], {
        useNative: true,
        enumName: 'verification_status_enum',
      })
      .notNullable()
      .defaultTo('PENDING');
    table.float('confidence_score').nullable();
    table.string('document_type', 50).nullable();
    table.jsonb('extracted_data').nullable();
    table.uuid('reviewer_id').nullable().references('id').inTable('users');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('verified_at').nullable();

    table.index('user_id');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('verifications');
  await knex.raw('DROP TYPE IF EXISTS verification_type_enum');
  await knex.raw('DROP TYPE IF EXISTS verification_status_enum');
}
