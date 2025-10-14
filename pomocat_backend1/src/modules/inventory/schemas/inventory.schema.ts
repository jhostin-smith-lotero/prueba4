import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Item' })
    itemId: string;

    @Prop({ required: true, default: false })
    equiped: boolean;

    @Prop({ required: true, default: false })
    locked: boolean;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);