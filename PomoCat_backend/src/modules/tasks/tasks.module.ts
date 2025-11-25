import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksService } from './services/tasks.service';
import { TaskRepository } from './repository/task.repository';
import { ITaskRepository } from './repository/task.repository.interface';
import { AuthModule } from 'src/modules/auth/auth.module'; // para el modelo User
import { ScheduleModule } from '@nestjs/schedule';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    TasksController
  ],
  providers: [
    TasksService,
    { provide: ITaskRepository, useClass: TaskRepository },
  ],
  exports: [TasksService],
})
export class TasksModule {}
