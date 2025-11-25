// pomodoro-session.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PomodoroSessionDocument = HydratedDocument<PomodoroSession>;

@Schema({ timestamps: true })
export class PomodoroSession {
  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  breakDuration: number;

  @Prop({ required: true, default: () => new Date() })
  startTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true, index: true })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ default: false })
  completed?: boolean;

  @Prop()
  endTime?: Date;
}

export const PomodoroSessionSchema = SchemaFactory.createForClass(PomodoroSession);
