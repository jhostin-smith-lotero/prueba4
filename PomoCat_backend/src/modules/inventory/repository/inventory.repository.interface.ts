import { UpdateQuery, FilterQuery } from "mongoose";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";
import { CreateInventoryDto } from "../dto/create-inventory.dto";

export const IInventoryRepository = Symbol('IInventoryRepository');

export interface IInventoryRepository {
  create(dto: CreateInventoryDto): Promise<InventoryDocument>;
  findAll(filter?: FilterQuery<Inventory>): Promise<InventoryDocument[]>;
  findByOne(id: string): Promise<InventoryDocument | null>;
  findByUserIdAndItemId(userId: string, itemId: string): Promise<InventoryDocument | null>;
  update(id: string, update: UpdateQuery<Inventory>): Promise<InventoryDocument | null>;
  remove(id: string): Promise<InventoryDocument | null>;
}