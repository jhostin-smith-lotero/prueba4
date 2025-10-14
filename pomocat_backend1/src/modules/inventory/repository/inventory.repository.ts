import { IInventoryRepository } from "./inventory.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { CreateInventoryDto } from "../dto/create-inventory.dto";
import { UpdateInventoryDto } from "../dto/update-inventory.dto";
import { Inventory, InventoryDocument } from "../schemas/inventory.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll() {
    return this.inventoryModel.find().exec();
  }

  async findOne(id: string) {
    return this.inventoryModel.findById(id).exec();
  }

  async update(id: string, updateInventory: UpdateInventoryDto) {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventory, { new: true }).exec();
  }

    async remove(id: string) {
    return this.inventoryModel.findByIdAndDelete(id).exec();
  }

}