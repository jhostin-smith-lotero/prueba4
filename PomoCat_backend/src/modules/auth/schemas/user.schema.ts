import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import type { PushProviders } from "../types/push-providers.type";

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class User {


  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: true })
  password: string;

  @Prop({ default: 0})
  coins: number;

  @Prop({ enum: Object.values(UserRole), default: UserRole.USER })
  role: UserRole;

  @Prop({
    type: {
      web: {
        endpoint: { type: String },
        p256dh: { type: String },
        auth: { type: String },
      },
      fcm: {
        token: { type: String },
      },
    },
    required: false,
    _id: false,
  })
  pushProviders?: PushProviders;

  @Prop({ required: true, default: 0 })
  streak: number;

  @Prop({ required: false, type: Date })
  lastCompletedDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual("id").get(function (this: any) {
  return this._id?.toString();
});


UserSchema.set("toJSON", {
  virtuals: true, 
  transform(_doc, ret) {
    delete (ret as any).password;
    delete (ret as any).__v;
    return ret;
  },
});
