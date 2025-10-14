import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';
import { PetController } from './controllers/pet.controller';
import { PetService } from './services/pet.service';
import { PET_REPO } from './repository/pet.repo.interface';
import { PetRepository } from './repository/pet.repo';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  controllers: [PetController],
  providers: [
    PetService,
    { provide: PET_REPO, useClass: PetRepository },
  ],
  exports: [PetService],
})
export class PetModule {}
