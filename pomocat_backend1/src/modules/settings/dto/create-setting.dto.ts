import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum Language {
  ES = 'es',
  EN = 'en',
}

export class CreateSettingDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  musicVolume?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  sfxVolume?: number;

  @IsOptional()
  @IsEnum(Language)
  language?: Language; // 'es' | 'en'
}