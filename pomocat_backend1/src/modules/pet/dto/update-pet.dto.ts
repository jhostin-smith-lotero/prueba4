import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {

    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsMongoId()
    hat?: string;

    @IsMongoId()
    shirt?: string;

    @IsMongoId()
    accesory?: string;

    @IsMongoId()
    skin?: string;

    @IsMongoId()
    background?: string;
}
