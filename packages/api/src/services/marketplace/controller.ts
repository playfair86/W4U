import { Request, Response, NextFunction } from 'express';
import { createJob } from './service';
import type { CreateJobInput } from './validation';

export async function postJob(
  req: Request<unknown, unknown, CreateJobInput>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // authenticate middleware guarantees req.user exists on protected routes
    const userId = req.user!.id;
    const job = await createJob(userId, req.body);

    res.status(201).json({
      success: true,
      data: {
        id: job.id,
        consumer_id: job.consumer_id,
        title: job.title,
        description: job.description,
        category: job.category,
        subcategory: job.subcategory,
        location_lat: job.location_lat ? Number(job.location_lat) : null,
        location_lng: job.location_lng ? Number(job.location_lng) : null,
        budget_min: job.budget_min,
        budget_max: job.budget_max,
        timeframe: job.timeframe,
        status: job.status,
        created_at:
          job.created_at instanceof Date ? job.created_at.toISOString() : job.created_at,
        updated_at:
          job.updated_at instanceof Date ? job.updated_at.toISOString() : job.updated_at,
      },
    });
  } catch (err) {
    next(err);
  }
}
