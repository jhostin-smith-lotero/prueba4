import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateInventoryDto {

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    itemId: string;

    @IsBoolean()
    equiped: boolean;

    @IsBoolean()
    locked: boolean;

}


