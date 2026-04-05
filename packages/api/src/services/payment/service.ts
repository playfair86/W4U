import db from '../../config/database';
import { AppError } from '../../middleware/errorHandler';
import { TransactionType, TransactionStatus, WalletStatus } from '@w4u/shared';

export interface WalletRecord {
  id: string;
  user_id: string;
  balance: string;
  status: WalletStatus;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionRecord {
  id: string;
  from_wallet_id: string | null;
  to_wallet_id: string | null;
  type: TransactionType;
  amount: string;
  fee: string;
  net_amount: string;
  status: TransactionStatus;
  reference: string;
  created_at: Date;
}

export async function getWalletByUserId(userId: string): Promise<WalletRecord> {
  const wallet = await db<WalletRecord>('wallets').where({ user_id: userId }).first();
  if (!wallet) {
    throw new AppError('WALLET_NOT_FOUND', 'Wallet not found for user', 404);
  }
  return wallet;
}

export async function getRecentTransactions(
  walletId: string,
  limit: number,
): Promise<Array<TransactionRecord & { counterparty_name: string | null }>> {
  const rows = await db('transactions as t')
    .leftJoin('wallets as fw', 't.from_wallet_id', 'fw.id')
    .leftJoin('wallets as tw', 't.to_wallet_id', 'tw.id')
    .leftJoin('users as fu', 'fw.user_id', 'fu.id')
    .leftJoin('users as tu', 'tw.user_id', 'tu.id')
    .where('t.from_wallet_id', walletId)
    .orWhere('t.to_wallet_id', walletId)
    .select(
      't.*',
      'fu.display_name as from_name',
      'tu.display_name as to_name',
    )
    .orderBy('t.created_at', 'desc')
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    from_wallet_id: row.from_wallet_id,
    to_wallet_id: row.to_wallet_id,
    type: row.type,
    amount: row.amount,
    fee: row.fee,
    net_amount: row.net_amount,
    status: row.status,
    reference: row.reference,
    created_at: row.created_at,
    counterparty_name: row.from_wallet_id === walletId ? row.to_name : row.from_name,
  }));
}
