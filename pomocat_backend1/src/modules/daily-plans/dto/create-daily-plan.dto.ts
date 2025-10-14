// create-daily-plan.dto.ts
import { IsInt, Min, Max, IsISO8601, IsString, IsOptional } from 'class-validator';

export class CreateDailyPlanDto {
  @IsInt() @Min(0) @Max(6)
  day: number;

  @IsISO8601()
  @IsOptional()
  startTime: string;

  @IsISO8601()
  endTime: string;

  @IsOptional() @IsString()
  note?: string;
}

