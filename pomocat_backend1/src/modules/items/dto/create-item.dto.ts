import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum ItemType {
    HAT = 'HAT',
    SHIRT = 'SHIRT',
    ACCESORY = 'ACCESORY',
    SKIN = "SKIN",
    BACKGROUND = "BACKGROUND"
}

export enum quality {
    EPIC="EPIC",
    LEGENDARY="LEGENDARY",
    COMMON="COMMON"
}

export class CreateItemDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    sprite_path: string;

    @IsEnum(ItemType)
    type: ItemType;

    @IsOptional()
    @IsEnum(quality)
    itemQuality: quality;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsBoolean()
    isValid: boolean

}
