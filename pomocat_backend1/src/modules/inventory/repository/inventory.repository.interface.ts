import { UpdateQuery, FilterQuery } from "mongoose";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";

export const IInventoryRepository = Symbol('IInventoryRepository');

export interface IInventoryRepository {
  create(inventory: Inventory): Promise<InventoryDocument>;
  findAll(): Promise<InventoryDocument[]>;
  findOne(id:string): Promise<InventoryDocument | null>;
  update(id: string, updateInventory: UpdateQuery<InventoryDocument>): Promise<InventoryDocument | null>;
  remove(id: string): Promise<InventoryDocument | null>;
}