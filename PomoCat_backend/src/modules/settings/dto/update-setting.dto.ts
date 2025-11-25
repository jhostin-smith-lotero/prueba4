import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto, Language } from './create-setting.dto';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
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
