import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/modules/auth/schemas/user.schema';
import { Item } from 'src/modules/items/schemas/item.schema';

export const defaultSkinPath = '/cats/defaultCat.png';
export const defaultBackgroundPath = '/backgrounds/defaultBackground.png';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true, collection: 'pets' })
export class Pet {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Item.name, required: false })
  hat?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Item.name, required: false })
  shirt?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Item.name, required: false })
  accessory?: Types.ObjectId;

  @Prop({ type: String, required: true, default: defaultSkinPath })
  skin: string;

  @Prop({ type: String, required: true, default: defaultBackgroundPath })
  background: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
