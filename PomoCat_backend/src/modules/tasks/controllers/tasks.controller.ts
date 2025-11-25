import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  create(@Body() createTaskDto: CreateTaskDto, @Param('userId') userId: string) {
    return this.tasksService.create(createTaskDto, userId);
  }

  // Obtener las tareas de todos los usuarios
  @Get()
  findAllTasks() {
    return this.tasksService.findAllTasks();
  }

  // ✅ Todas las tareas de un usuario
  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.tasksService.findAllByUser(userId);
  }

  // ✅ Obtener una tarea específica
  @Get('task/:id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }


  // Actualizar una tarea específica
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Post('completed/:userId/:id')
  complete(@Param('id') id: string, @Param('userId') userId: string) {
    return this.tasksService.completeTask(id, userId);
  }

  // Eliminar una tarea específica
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Get(':userId/reminders')
  async getReminders(@Param('userId') userId: string) {
    return this.tasksService.getRemindersForUser(userId);
}

}
