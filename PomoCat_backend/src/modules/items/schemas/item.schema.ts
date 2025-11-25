import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItemType, quality } from "../dto/create-item.dto";
import { HydratedDocument } from "mongoose";

export type itemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: String })
    sprite_path: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, enum: ItemType, default: ItemType.HAT })
    type: ItemType;

    @Prop({ required: true, enum: quality, default: quality.COMMON })
    itemQuality: quality;

    @Prop({ required: true, default: true })
    isValid: boolean;

    @Prop({ required: false })
    posX: number;

    @Prop({ required: false })
    posY: number;

    @Prop({ required: false })
    width: number;

    @Prop({ required: false })
    height: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
