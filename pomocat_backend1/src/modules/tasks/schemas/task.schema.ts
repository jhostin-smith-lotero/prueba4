import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskState } from '../enums/task-state.enum';
import { User } from 'src/modules/auth/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true, collection: 'tasks' })
export class Task {
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: String, enum: TaskState, default: TaskState.PENDING })
  state: TaskState;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop()
  notifyLocalTime?: string; // "HH:mm"

  @Prop({ type: Number, min: 0 })
  dailyMinutes?: number;

  @Prop({ default: 'America/Bogota'})
  timezone?: string;

  @Prop({ type: Date })
  dueDate?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
