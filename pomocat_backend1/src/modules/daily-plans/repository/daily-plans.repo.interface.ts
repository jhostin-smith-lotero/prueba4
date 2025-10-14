import { UpdateQuery, Model } from 'mongoose';
import { DailyPlan } from '../schema/daily-plan.schema';

export const DAILY_PLAN_REPO = 'DAILY_PLAN_REPO';

export interface IDailyPlanRepository {
  overlapExists(userId: string, day: number, start: Date, end: Date): Promise<boolean>;
  readDayOfWeek(day: number): string;
  reminder(userId: string): Promise<void>;
  create(dto: Partial<DailyPlan>, userId: string, taskId: string): Promise<DailyPlan>;
  findAll(): Promise<DailyPlan[]>;
  findAllByUser(userId: string): Promise<DailyPlan[]>;
  findOne(id: string): Promise<DailyPlan | null>;
  update(id: string, dto: UpdateQuery<DailyPlan>): Promise<DailyPlan | null>;
  delete(id: string): Promise<DailyPlan | null>;
}
