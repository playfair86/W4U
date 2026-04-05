import type { Knex } from 'knex';
import {
  Role,
  TrustTier,
  UserType,
  WalletStatus,
  TransactionType,
  TransactionStatus,
  JobStatus,
} from '@w4u/shared';

export async function seed(knex: Knex): Promise<void> {
  // Clean up in dependency order
  await knex('reviews').del();
  await knex('jobs').del();
  await knex('transactions').del();
  await knex('refresh_tokens').del();
  await knex('otp_codes').del();
  await knex('verifications').del();
  await knex.raw('UPDATE users SET wallet_id = NULL');
  await knex('wallets').del();
  await knex('users').del();

  // --- Users ---
  const [provider] = await knex('users')
    .insert({
      phone_number: '+27821000001',
      user_type: UserType.PROVIDER,
      display_name: 'Sipho the Painter',
      language_preference: 'zu',
      trust_tier: TrustTier.ID_VERIFIED,
      trust_score: 4.2,
      average_rating: 4.7,
      total_reviews: 23,
      total_vouches: 8,
      role: Role.PROVIDER,
      verified_at: new Date(),
    })
    .returning('*');

  const [consumer] = await knex('users')
    .insert({
      phone_number: '+27821000002',
      user_type: UserType.CONSUMER,
      display_name: 'Sarah Homeowner',
      language_preference: 'en',
      trust_tier: TrustTier.ID_VERIFIED,
      role: Role.USER,
      verified_at: new Date(),
    })
    .returning('*');

  const [admin] = await knex('users')
    .insert({
      phone_number: '+27821000003',
      user_type: UserType.BOTH,
      display_name: 'W4U Admin',
      language_preference: 'en',
      trust_tier: TrustTier.FULLY_VETTED,
      role: Role.ADMIN,
      verified_at: new Date(),
    })
    .returning('*');

  // --- Wallets ---
  const [providerWallet] = await knex('wallets')
    .insert({ user_id: provider.id, balance: 100.0, status: WalletStatus.ACTIVE })
    .returning('*');

  const [consumerWallet] = await knex('wallets')
    .insert({ user_id: consumer.id, balance: 500.0, status: WalletStatus.ACTIVE })
    .returning('*');

  const [adminWallet] = await knex('wallets')
    .insert({ user_id: admin.id, balance: 1000.0, status: WalletStatus.ACTIVE })
    .returning('*');

  await knex('users').where({ id: provider.id }).update({ wallet_id: providerWallet.id });
  await knex('users').where({ id: consumer.id }).update({ wallet_id: consumerWallet.id });
  await knex('users').where({ id: admin.id }).update({ wallet_id: adminWallet.id });

  // --- Transactions ---
  await knex('transactions').insert([
    {
      from_wallet_id: consumerWallet.id,
      to_wallet_id: providerWallet.id,
      type: TransactionType.SERVICE_PAYMENT,
      amount: 100.0,
      fee: 2.5,
      net_amount: 97.5,
      status: TransactionStatus.COMPLETED,
      reference: 'SEED-SVC-001',
    },
    {
      from_wallet_id: null,
      to_wallet_id: consumerWallet.id,
      type: TransactionType.FUND,
      amount: 500.0,
      fee: 0,
      net_amount: 500.0,
      status: TransactionStatus.COMPLETED,
      reference: 'SEED-FUND-001',
    },
  ]);

  // --- Jobs ---
  await knex('jobs').insert([
    {
      consumer_id: consumer.id,
      title: 'Paint 2 bedrooms',
      description: 'Need two bedrooms painted, walls and ceilings. White paint. Prep included.',
      category: 'Home & Property',
      subcategory: 'Painting',
      location_lat: -26.1076,
      location_lng: 28.0567,
      budget_min: 1500.0,
      budget_max: 2500.0,
      timeframe: 'This weekend',
      status: JobStatus.OPEN,
    },
    {
      consumer_id: consumer.id,
      title: 'Weekly garden service',
      description: 'Looking for a reliable gardener for weekly maintenance of a medium-sized yard.',
      category: 'Garden & Outdoor',
      subcategory: 'Gardening',
      location_lat: -26.1076,
      location_lng: 28.0567,
      budget_min: 300.0,
      budget_max: 500.0,
      timeframe: 'Recurring weekly',
      status: JobStatus.OPEN,
    },
  ]);

  // --- Review ---
  await knex('reviews').insert({
    reviewer_id: consumer.id,
    provider_id: provider.id,
    overall_rating: 5,
    punctuality: 5,
    quality: 5,
    communication: 4,
    value_for_money: 5,
    comment: 'Excellent work, very professional and clean.',
  });
}
