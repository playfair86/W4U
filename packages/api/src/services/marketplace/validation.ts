import { z } from 'zod';
import { SERVICE_CATEGORIES } from '@w4u/shared';

const validCategories = Object.keys(SERVICE_CATEGORIES);

export const createJobSchema = z
  .object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(2000),
    category: z.enum(validCategories as [string, ...string[]]),
    subcategory: z.string().max(100).optional(),
    location: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
    budget_min: z.number().positive(),
    budget_max: z.number().positive(),
    timeframe: z.string().max(100).optional(),
  })
  .refine((data) => data.budget_max >= data.budget_min, {
    message: 'budget_max must be >= budget_min',
    path: ['budget_max'],
  })
  .refine(
    (data) => {
      if (!data.subcategory) return true;
      const subs = SERVICE_CATEGORIES[data.category] || [];
      return subs.includes(data.subcategory);
    },
    {
      message: 'subcategory must belong to the selected category',
      path: ['subcategory'],
    },
  );

export type CreateJobInput = z.infer<typeof createJobSchema>;
