import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Language } from '../dto/create-setting.dto';

export type SettingsDocument = HydratedDocument<Settings>;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, min: 0, max: 100, default: 50 })
  musicVolume: number;

  @Prop({ type: Number, min: 0, max: 100, default: 50 })
  sfxVolume: number;

  @Prop({ type: String, enum: Language, default: Language.ES })
  language: Language;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);


SettingsSchema.index({ userId: 1 }, { unique: true });
