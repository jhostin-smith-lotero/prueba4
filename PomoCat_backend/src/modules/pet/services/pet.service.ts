import { Injectable, BadRequestException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';
import { PET_REPO, type IPetRepository } from '../repository/pet.repo.interface';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { Pet } from '../schemas/pet.schema';

@Injectable()
export class PetService {
  constructor(@Inject(PET_REPO) private readonly repo: IPetRepository) {}

  async create(dto: CreatePetDto, userId: string) {
    if (!userId || !isValidObjectId(userId)) {
      throw new BadRequestException('userId inválido');
    }

    const oid = (v?: string) => (v ? new Types.ObjectId(v) : undefined);

    const payload: Partial<Pet> = {
      hat: oid(dto.hat),
      shirt: oid(dto.shirt),
      accessory: oid(dto.accessory),
      userId: new Types.ObjectId(userId),
    };

    return this.repo.create(payload, userId);
  }

  async update(id: string, dto: UpdatePetDto) {
    const update: Partial<Pet> = {};
    if (dto.hat !== undefined) update.hat = dto.hat ? new Types.ObjectId(dto.hat) : undefined;
    if (dto.shirt !== undefined) update.shirt = dto.shirt ? new Types.ObjectId(dto.shirt) : undefined;
    if (dto.accessory !== undefined) update.accessory = dto.accessory ? new Types.ObjectId(dto.accessory) : undefined;
    if (dto.skin !== undefined)       update.skin       = dto.skin;
    if (dto.background !== undefined) update.background = dto.background;


    return this.repo.updateByUserId(id, update as any);
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    return this.repo.findById(id);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
