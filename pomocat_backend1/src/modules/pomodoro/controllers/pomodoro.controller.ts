import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePomodoroDto } from '../dto/create-pomodoro.dto';
import { UpdatePomodoroDto } from '../dto/update-pomodoro.dto';
import { PomodoroService } from '../services/pomodoro.service';

@Controller('pomodoroSession')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Post('create/:userId/:taskId')
  create(@Body() createPomodoroDto: CreatePomodoroDto, @Param('userId') userId: string, @Param('taskId') taskId: string) {
    return this.pomodoroService.create(createPomodoroDto, userId, taskId);
  }

  @Get('all')
  findAll() {
    return this.pomodoroService.findAll();
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.pomodoroService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pomodoroService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePomodoroDto: UpdatePomodoroDto) {
    return this.pomodoroService.update(id, updatePomodoroDto);
  }

  @Post('complete/:id')
  complete(@Param('id') id: string) {
    return this.pomodoroService.complete(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pomodoroService.remove(id);
  }
}
