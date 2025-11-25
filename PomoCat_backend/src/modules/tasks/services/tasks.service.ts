import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskState } from '../enums/task-state.enum';
import { User, UserDocument } from 'src/modules/auth/schemas/user.schema';
import { ITaskRepository } from '../repository/task.repository.interface';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(ITaskRepository) private readonly taskRepository: ITaskRepository,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return this.taskRepository.create({
      ...createTaskDto,
      userId: new Types.ObjectId(userId),
      // state cae al default si no viene en DTO
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined,
    });
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  findAllByUser(userId: string) {
    return this.taskRepository.find({ userId: new Types.ObjectId(userId) });
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const update: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) update.dueDate = new Date(updateTaskDto.dueDate);
    return this.taskRepository.update(id, update);
  }

  async findAllTasks() {
    return this.taskRepository.findAllTasks();
  }

  async completeTask(id: string, userId: string) {
    // Completa la tarea
    const task = await this.taskRepository.findOneAndUpdate(id, { state: TaskState.COMPLETED });
    if (!task) return null;

    // Lógica de racha
    const user = await this.userModel.findById(userId).exec();
    if (!user) return task;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last = user.lastCompletedDate ? new Date(user.lastCompletedDate) : null;
    if (last) last.setHours(0, 0, 0, 0);

    const dayMs = 24 * 60 * 60 * 1000;

    if (!last || (today.getTime() - last.getTime()) > dayMs) {
      user.streak = 1;
    } else if ((today.getTime() - last.getTime()) === dayMs) {
      user.streak = (user.streak ?? 0) + 1;
    }
    user.lastCompletedDate = today;
    await user.save();
    return task;
  }

  remove(id: string) {
    return this.taskRepository.findOneAndDelete(id);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async scanReminders() {
    // se podría: listar usuarios y, por cada uno, llamar getRemindersForUser(userId)
    this.logger.debug('Escaneando recordatorios…');
  }

  async getRemindersForUser(userId: string) {
    const now = new Date();
    const in5Min = new Date(now.getTime() + 5 * 60 * 1000);

    const tasks = await this.taskRepository.find({
      userId: new Types.ObjectId(userId),
      dueDate: { $lte: in5Min, $gte: now },
    });

    return tasks.map((task) => ({
      title: task.title,
      dueDate: task.dueDate,
      message: `⚠️ La tarea "${task.title}" vence pronto (vence: ${task.dueDate?.toISOString()})`,
    }));
  }
}
