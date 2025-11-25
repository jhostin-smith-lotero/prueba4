import { IAuthRepository } from "./Auth.repository.interface";
import { Injectable } from "@nestjs/common";
import { Model, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  
  sanitize(user: UserDocument): Partial<User> {
    const { password, ...sanitized } = user.toObject();
    return sanitized;
  }

async createUserAsAdmin(dto: CreateUserDto): Promise<Partial<User>> {
  const hashed = await this.hashPassword(dto.password);
  const { _id, id, ...clean } = dto as any;
  const normalizedEmail = clean.email.trim().toLowerCase();

  const created = await this.userModel.create({
    ...clean,
    email: normalizedEmail,
    password: hashed,
    role: "admin",
  });
  return this.sanitize(created);
}

async createUserAsRegular(dto: CreateUserDto): Promise<Partial<User>> {
  const hashed = await this.hashPassword(dto.password);
  const { _id, id, ...clean } = dto as any;
  const normalizedEmail = clean.email.trim().toLowerCase();

  const created = await this.userModel.create({
    ...clean,
    email: normalizedEmail,
    password: hashed,
    role: "user",
  });
  return this.sanitize(created);
}

  async changeRole(userId: string, newRole: User["role"]): Promise<Partial<User> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    user.role = newRole;
    await user.save();
    return this.sanitize(user);
  }

  async update(userId: string, update: UpdateQuery<User>): Promise<Partial<User> | null> {
    // Si viene password en update, hashearla aquí también
    if ((update as any)?.password) {
      const hashed = await this.hashPassword((update as any).password);
      (update as any).password = hashed;
    }
    const user = await this.userModel.findByIdAndUpdate(userId, update, { new: true });
    return user ? this.sanitize(user) : null;
  }

  async getAllUsers(): Promise<Partial<User>[]> {
    const users = await this.userModel.find().exec();
    return users.map((u) => this.sanitize(u));
  }

  async getUserById(userId: string): Promise<Partial<User> | null> {
    const user = await this.userModel.findById(userId).exec();
    return user ? this.sanitize(user) : null;
  }

  async login(email: string, password: string): Promise<{ user: Partial<User>; access_token: string } | null> {
    const normalized = email.trim().toLowerCase();
    const user = await this.userModel.findOne({ email: normalized }).exec();
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const payload = { email: normalized, sub: user._id.toString(), role: user.role };
    const access_token = this.jwtService.sign(payload);
    return { user: this.sanitize(user), access_token };
    }

  async sumCoins(userId: string, amount: number): Promise<Partial<User> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    user.coins += amount;
    await user.save();
    return this.sanitize(user);
  }

  async deductCoins(userId: string, amount: number): Promise<Partial<User> | null> {
    const user = await this.userModel.findById(userId);
    if (!user) return null;
    user.coins = Math.max(0, user.coins - amount);
    await user.save();
    return this.sanitize(user);
  }
}
