import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';
import { IsString, IsMongoId, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    userId?: string;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    itemId?: string;

    @IsBoolean()
    equiped: boolean;

    @IsBoolean()
    locked?: boolean;

}
