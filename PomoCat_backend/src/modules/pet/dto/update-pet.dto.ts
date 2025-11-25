import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {

    @IsMongoId()
    @IsOptional()
    hat?: string;

    @IsMongoId()
    @IsOptional()
    shirt?: string;

    @IsMongoId()
    @IsOptional()
    accessory?: string;

    @IsString()
    @IsOptional()
    skin?: string;

    @IsString()
    @IsOptional()
    background?: string;
}
