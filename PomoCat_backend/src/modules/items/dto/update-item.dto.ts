import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto, ItemType, quality } from './create-item.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {

        @IsString()
        @IsNotEmpty()
        name?: string;
    
        sprite_path?: string;
    
        @IsEnum(ItemType)
        type?: ItemType;
    
        @IsOptional()
        @IsEnum(quality)
        itemQuality?: quality;
    
        @IsNotEmpty()
        @IsNumber()
        price?: number;

}


