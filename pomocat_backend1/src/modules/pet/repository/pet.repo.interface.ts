import { UpdateQuery } from 'mongoose';
import { Pet, PetDocument } from '../schemas/pet.schema';

export const PET_REPO = Symbol('PET_REPO');

export interface IPetRepository {
  create(pet: Partial<Pet>, userId: string): Promise<PetDocument>;
  findAll(): Promise<PetDocument[]>;
  findById(id: string): Promise<PetDocument | null>;
  update(id: string, pet: UpdateQuery<Pet>): Promise<PetDocument | null>;
  delete(id: string): Promise<PetDocument | null>;
}
