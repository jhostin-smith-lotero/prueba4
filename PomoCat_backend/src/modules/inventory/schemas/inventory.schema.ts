import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ timestamps: true, collection: 'inventories' })
export class Inventory {
  @Prop({ required: true, type: String, ref: 'User', index: true })
  userId: string;

  @Prop({ required: true, type: String, ref: 'Item', index: true })
  itemId: string;

  @Prop({ required: true, default: false })
  equiped: boolean;

  @Prop({ required: true, default: false })
  locked: boolean;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
InventorySchema.index({ userId: 1, itemId: 1 }, { unique: true });
