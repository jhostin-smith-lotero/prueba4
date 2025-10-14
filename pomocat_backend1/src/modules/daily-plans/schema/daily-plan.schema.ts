import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'daily_plans' })
export class DailyPlan {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) taskId: string;

  @Prop({ required: true, min: 0, max: 6 }) day: number;

  @Prop({ type: Date, required: false, default: new Date}) startTime: Date;
  @Prop({ type: Date, required: true }) endTime: Date;

  @Prop() note?: string;
}

export type DailyPlanDocument = HydratedDocument<DailyPlan>;
export const DailyPlanSchema = SchemaFactory.createForClass(DailyPlan);

DailyPlanSchema.index({ userId: 1, day: 1, startTime: 1, endTime: 1 });
