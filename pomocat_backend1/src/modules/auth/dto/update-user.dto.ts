import { IsEmail, IsEnum, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  coins?: number;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}