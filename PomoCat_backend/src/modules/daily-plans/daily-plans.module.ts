// daily-plans.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyPlan, DailyPlanSchema } from './schema/daily-plan.schema';
import { DailyPlansService } from './services/daily-plans.service';
import { DailyPlansController } from './controllers/daily-plans.controller';
import { DailyPlanRepository } from './repository/daily-plans.repo';
import { DAILY_PLAN_REPO } from './repository/daily-plans.repo.interface';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: DailyPlan.name, schema: DailyPlanSchema }]),
  ],
  controllers: [DailyPlansController],
  providers: [
    DailyPlansService,
    { provide: DAILY_PLAN_REPO, useClass: DailyPlanRepository },
  ],
  exports: [
    DailyPlansService,
    { provide: DAILY_PLAN_REPO, useClass: DailyPlanRepository },
  ],
})
export class DailyPlansModule {}
