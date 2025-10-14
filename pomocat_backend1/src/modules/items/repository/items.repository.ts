import { IItemsRepository } from "./items.repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery } from "mongoose";
import { Item, itemDocument } from "../schemas/item.schema";

@Injectable()
export class ItemsRepository implements IItemsRepository {
  constructor(@InjectModel(Item.name) private itemModel: Model<itemDocument>) {}

  async create(item: Item): Promise<itemDocument> {
    const createdItem = new this.itemModel(item);
    return createdItem.save();
  }

  async findAll(): Promise<itemDocument[]> {
    return this.itemModel.find().exec();
  }

  async findAllValid(): Promise<itemDocument[]> {
    return this.itemModel.find({ isValid: true }).exec();
  }

  async findOne(id: string): Promise<itemDocument | null> {
    return this.itemModel.findById(id).exec();
  }

  async update(id: string, item: UpdateQuery<Item>): Promise<itemDocument | null> {
    return this.itemModel.findByIdAndUpdate(id, item).exec();
  }

  async remove(id: string): Promise<itemDocument | null> {
    return this.itemModel.findByIdAndDelete(id).exec();
  }

  async getPrice(id: string): Promise<number | null> {
    const item = await this.itemModel.findById(id).exec();
    return item ? item.price : null;
  }
  
}
