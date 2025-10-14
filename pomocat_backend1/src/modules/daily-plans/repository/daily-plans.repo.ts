import { IDailyPlanRepository } from './daily-plans.repo.interface';
import { Injectable } from '@nestjs/common';
import { DailyPlan, DailyPlanDocument } from '../schema/daily-plan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';

@Injectable()
export class DailyPlanRepository implements IDailyPlanRepository {
  constructor(
    @InjectModel(DailyPlan.name)
    private readonly dailyPlanModel: Model<DailyPlanDocument>,
  ) {}

  async overlapExists(userId: string, day: number, start: Date, end: Date): Promise<boolean> {
    const found = await this.dailyPlanModel.findOne({
      userId,
      day,
      startTime: { $lt: end },
      endTime: { $gt: start },
    }).lean().exec();
    return !!found;
  }

  readDayOfWeek(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day] ?? '';
  }

  async reminder(_userId: string): Promise<void> {
    // TODO: implementar (push/email/cron)
  }

  async create(dto: Partial<DailyPlan>, userId: string, taskId: string): Promise<DailyPlan> {
    const createdPlan = new this.dailyPlanModel({ ...dto, userId, taskId });
    return createdPlan.save();
  }

  async findAll(): Promise<DailyPlan[]> {
    return this.dailyPlanModel.find().exec();
  }

  async findAllByUser(userId: string): Promise<DailyPlan[]> {
    return this.dailyPlanModel.find({ userId }).exec();
  }

  async findOne(id: string): Promise<DailyPlan | null> {
    return this.dailyPlanModel.findById(id).exec();
  }

  async update(id: string, dto: UpdateQuery<DailyPlan>): Promise<DailyPlan | null> {
    return this.dailyPlanModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<DailyPlan | null> {
    return this.dailyPlanModel.findByIdAndDelete(id).exec();
  }

}

