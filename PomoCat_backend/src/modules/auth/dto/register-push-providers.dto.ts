import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WebPushDto {
  @IsString()
  endpoint: string;

  @IsString()
  p256dh: string;

  @IsString()
  auth: string;
}

class FcmPushDto {
  @IsString()
  token: string;
}

export class RegisterPushProvidersDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => WebPushDto)
  web?: WebPushDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FcmPushDto)
  fcm?: FcmPushDto;
}
