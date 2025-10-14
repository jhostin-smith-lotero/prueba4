import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { TaskState } from '../enums/task-state.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskState)
  state?: TaskState; // default en schema

  @IsOptional()
  @IsString()
  notifyLocalTime?: string; // "HH:mm"

  @IsOptional()
  @IsNumber()
  dailyMinutes?: number;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsDateString()
  dueDate: string;
}
