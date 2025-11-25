import { UpdateQuery } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';

export abstract class ITaskRepository {
  abstract create(task: Partial<Task>): Promise<TaskDocument>;
  abstract findAll(): Promise<TaskDocument[]>;
  abstract findOne(id: string): Promise<TaskDocument | null>;
  abstract update(id: string, task: UpdateQuery<Task>): Promise<TaskDocument | null>;
  abstract remove(id: string): Promise<TaskDocument | null>;
  abstract find(filter: any): Promise<TaskDocument[]>;
  abstract findOneAndUpdate(id: string, update: UpdateQuery<Task>): Promise<TaskDocument | null>;
  abstract findOneAndDelete(id: string): Promise<TaskDocument | null>;
  abstract findAllTasks(): Promise<TaskDocument[]>;
}
