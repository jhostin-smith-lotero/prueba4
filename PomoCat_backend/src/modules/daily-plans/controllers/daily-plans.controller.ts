import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DailyPlansService } from '../services/daily-plans.service';
import { CreateDailyPlanDto } from '../dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from '../dto/update-daily-plan.dto';

@Controller('daily-plans')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class DailyPlansController {
  constructor(private readonly service: DailyPlansService) {}

  @Post(':userId/:taskId')
  create(
    @Body() dto: CreateDailyPlanDto,
    @Param('userId') userId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.service.create(dto, userId, taskId);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDailyPlanDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('reminder/:userId')
  reminder(@Param('userId') userId: string) {
    return this.service.reminder(userId);
  }
}
