// daily-plans.service.ts
import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';
import { DAILY_PLAN_REPO, type IDailyPlanRepository } from '../repository/daily-plans.repo.interface';


@Injectable()
export class DailyPlansService {
  constructor(
    @Inject(DAILY_PLAN_REPO) private readonly repo: IDailyPlanRepository,
  ) {}

  private parseIsoToDate(iso: string): Date {
    const d = new Date(iso);
    if (isNaN(d.getTime())) throw new BadRequestException('Invalid ISO date');
    return d;
  }

  async create(dto: CreateDailyPlanDto, userId: string, taskId: string) {
    const start = this.parseIsoToDate(dto.startTime);
    const end = this.parseIsoToDate(dto.endTime);
    if (start >= end) throw new BadRequestException('startTime must be before endTime');

    const overlap = await this.repo.overlapExists(userId, dto.day, start, end);
    if (overlap) throw new BadRequestException('Time overlap with existing plan');

    return this.repo.create(
      { day: dto.day, startTime: start, endTime: end, note: dto.note },
      userId,
      taskId,
    );
  }

  findByUser(userId: string) {
    return this.repo.findAllByUser(userId);
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  async update(id: string, dto: UpdateDailyPlanDto) {
  const existing = await this.repo.findOne(id);
  if (!existing) throw new NotFoundException('DailyPlan not found');

  let start = existing.startTime;
  let end   = existing.endTime;
  let day   = existing.day;

  if (dto.startTime) start = this.parseIsoToDate(dto.startTime);
  if (dto.endTime)   end   = this.parseIsoToDate(dto.endTime);
  if (dto.day !== undefined) day = dto.day;

  if (start >= end) throw new BadRequestException('startTime must be before endTime');

  const overlap = await this.repo.overlapExists(existing.userId as any, day, start, end);
  if (overlap) throw new BadRequestException('Time overlap with existing plan');

  return this.repo.update(id, {
    day,
    startTime: start,
    endTime: end,
    ...(dto.note !== undefined ? { note: dto.note } : {}),
  });
}

  async remove(id: string) {
    const removed = await this.repo.delete(id);
    if (!removed) throw new NotFoundException('DailyPlan not found');
    return removed;
  }

  async reminder(userId: string) {
    await this.repo.reminder(userId);
    return { status: 'ok' };
  }

  readDayOfWeek(day: number): string {
    return this.repo.readDayOfWeek(day);
  }
}

