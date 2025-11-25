// create-item.dto.ts
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum ItemType { HAT='HAT', SHIRT='SHIRT', ACCESORY='ACCESSORY', SKIN='SKIN', BACKGROUND='BACKGROUND' }
export enum quality { EPIC='EPIC', LEGENDARY='LEGENDARY', COMMON='COMMON' }

export class CreateItemDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() sprite_path: string;  
  @IsEnum(ItemType) type: ItemType;
  @IsOptional() @IsEnum(quality) itemQuality?: quality;
  @IsNumber() price: number;
  @IsOptional() @IsBoolean() isValid?: boolean;
  @IsOptional() @IsNumber() posX?: number;
  @IsOptional() @IsNumber() posY?: number;
  @IsOptional() @IsNumber() width?: number;
  @IsOptional() @IsNumber() height?: number;

}
