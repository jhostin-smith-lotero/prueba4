import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery, Types } from 'mongoose';
import { Pet, PetDocument } from '../schemas/pet.schema';
import { IPetRepository } from './pet.repo.interface';

@Injectable()
export class PetRepository implements IPetRepository {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async create(pet: Partial<Pet>, userId: string): Promise<PetDocument> {
    const doc = await this.petModel.create({
      ...pet,
      userId: pet.userId ?? new Types.ObjectId(userId),
    });
    return doc;
  }

  async findAll(): Promise<PetDocument[]> {
    return this.petModel.find().exec();
  }

  async findById(id: string): Promise<PetDocument | null> {
    return this.petModel.findById(id).exec();
  }

  async update(id: string, pet: UpdateQuery<Pet>): Promise<PetDocument | null> {
    return this.petModel.findByIdAndUpdate(id, pet, { new: true }).exec();
  }

  async delete(id: string): Promise<PetDocument | null> {
    return this.petModel.findByIdAndDelete(id).exec();
  }
}
