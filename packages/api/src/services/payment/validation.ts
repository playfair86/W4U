import { z } from 'zod';

export const walletQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .pipe(z.number().int().min(1).max(100)),
});

export type WalletQueryInput = z.infer<typeof walletQuerySchema>;
