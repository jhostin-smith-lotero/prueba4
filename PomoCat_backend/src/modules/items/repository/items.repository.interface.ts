import { UpdateQuery } from "mongoose";
import { Item, itemDocument } from "../schemas/item.schema";

export abstract class IItemsRepository {
  abstract create(item: Item): Promise<itemDocument>;
  abstract findAll(): Promise<itemDocument[]>;
  abstract findAllValid(): Promise<itemDocument[]>;
  abstract findOne(id: string): Promise<Item| null>;
  abstract update(id: string, item: UpdateQuery<Item>): Promise<itemDocument | null>;
  abstract remove(id: string): Promise<itemDocument | null>;
  abstract getPrice(id: string): Promise<number | null>;
}