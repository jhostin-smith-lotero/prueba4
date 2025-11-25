import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, UpdateQuery, FilterQuery } from "mongoose";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";
import { IInventoryRepository } from "./inventory.repository.interface";
import { CreateInventoryDto } from "../dto/create-inventory.dto";

export class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<InventoryDocument>,
  ) {}

  create(dto: CreateInventoryDto): Promise<InventoryDocument> {
    const payload = {
      userId: new Types.ObjectId(dto.userId),
      itemId: new Types.ObjectId(dto.itemId),
      equiped: dto.equiped ?? false,
      locked: dto.locked ?? false,
    };
    return this.inventoryModel.create(payload);
  }

  findAll(filter: FilterQuery<Inventory> = {}) {
    return this.inventoryModel.find(filter).exec();
  }

  findByOne(id: string) {
    return this.inventoryModel.findById(id).exec();
  }

  findByUserIdAndItemId(userId: string, itemId: string) {
  return this.inventoryModel.findOne({ userId, itemId }).lean().exec();
}

  update(id: string, update: UpdateQuery<Inventory>) {
    return this.inventoryModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  remove(id: string) {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }
}