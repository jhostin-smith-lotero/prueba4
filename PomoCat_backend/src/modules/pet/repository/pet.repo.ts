import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pet, PetDocument } from '../schemas/pet.schema';
import { IPetRepository } from './pet.repo.interface';
import { BadRequestException } from '@nestjs/common';

const OID = (id: unknown) => {
  if (typeof id !== 'string' || !Types.ObjectId.isValid(id)) {
    throw new BadRequestException('Invalid ObjectId');
  }
  return Types.ObjectId.createFromHexString(id);
};

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

  async findById(userId: string): Promise<PetDocument | null> {
    if (!Types.ObjectId.isValid(userId)) return null;
    const filter = { userId: new Types.ObjectId(userId) };
    return this.petModel.findOne(filter).lean().exec();
  }

  async updateByUserId(userId: string, patch: Partial<Pet>) {
    const update: any = { ...patch };

    if (typeof update.hat === 'string') {
      update.hat = OID(update.hat);
    }
    if (typeof update.shirt === 'string') {
      update.shirt = OID(update.shirt);
    }
    if (typeof update.accessory === 'string') {
      update.accessory = OID(update.accessory);
    }

    return this.petModel.findOneAndUpdate(
      { userId: OID(userId) },
      { $set: update },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<PetDocument | null> {
    return this.petModel.findByIdAndDelete(id).exec();
  }
}
