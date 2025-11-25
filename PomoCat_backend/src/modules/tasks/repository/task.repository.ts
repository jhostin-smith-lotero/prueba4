import { Injectable } from '@nestjs/common';
import { Model, UpdateQuery } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ITaskRepository } from './task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(task: Partial<Task>): Promise<TaskDocument> {
    return this.taskModel.create(task);
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, task: UpdateQuery<Task>): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async remove(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async find(filter: any): Promise<TaskDocument[]> {
    return this.taskModel.find(filter).exec();
  }

  async findOneAndUpdate(id: string, update: UpdateQuery<Task>): Promise<TaskDocument | null> {
    return this.taskModel.findOneAndUpdate({ _id: id }, update, { new: true }).exec();
  }

  async findOneAndDelete(id: string): Promise<TaskDocument | null> {
    return this.taskModel.findOneAndDelete({ _id: id }).exec();
  }

  async findAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }
}
