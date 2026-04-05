import { Request, Response, NextFunction } from 'express';
import { getWalletByUserId, getRecentTransactions } from './service';

export async function getMyWallet(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user!.id;
    const wallet = await getWalletByUserId(userId);
    const transactions = await getRecentTransactions(wallet.id, 10);

    res.status(200).json({
      success: true,
      data: {
        id: wallet.id,
        balance: wallet.balance,
        status: wallet.status,
        recent_transactions: transactions.map((t) => ({
          id: t.id,
          type: t.type,
          amount: t.amount,
          fee: t.fee,
          net_amount: t.net_amount,
          status: t.status,
          reference: t.reference,
          counterparty_name: t.counterparty_name,
          created_at: t.created_at instanceof Date ? t.created_at.toISOString() : t.created_at,
        })),
      },
    });
  } catch (err) {
    next(err);
  }
}
