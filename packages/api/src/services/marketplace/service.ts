import db from '../../config/database';
import { JobStatus } from '@w4u/shared';
import type { CreateJobInput } from './validation';

export interface JobRecord {
  id: string;
  consumer_id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string | null;
  location_lat: string | null;
  location_lng: string | null;
  budget_min: string | null;
  budget_max: string | null;
  timeframe: string | null;
  status: JobStatus;
  created_at: Date;
  updated_at: Date;
}

export async function createJob(consumerId: string, input: CreateJobInput): Promise<JobRecord> {
  const [job] = await db<JobRecord>('jobs')
    .insert({
      consumer_id: consumerId,
      title: input.title,
      description: input.description,
      category: input.category,
      subcategory: input.subcategory || null,
      location_lat: input.location.lat,
      location_lng: input.location.lng,
      budget_min: input.budget_min,
      budget_max: input.budget_max,
      timeframe: input.timeframe || null,
      status: JobStatus.OPEN,
    })
    .returning('*');

  return job;
}
