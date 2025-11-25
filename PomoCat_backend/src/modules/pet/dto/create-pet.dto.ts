import { IsMongoId, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePetDto {
  @IsOptional()
  @IsMongoId()
  hat?: string;

  @IsOptional()
  @IsMongoId()
  shirt?: string;

  @IsOptional()
  @IsMongoId()
  accessory?: string;

  // Si algún día referenciaras skins/items como ObjectId, agrega aquí
  // @IsOptional()
  // @IsMongoId()
  // skinItem?: string;

  // @IsOptional()
  // @IsMongoId()
  // backgroundItem?: string;
}
