import { UpdateQuery } from "mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { CreateUserDto } from "../dto/create-user.dto";

export abstract class IAuthRepository {
  abstract hashPassword(password: string): Promise<string>;
  abstract sanitize(user: UserDocument): Partial<User>;
  abstract createUserAsAdmin(dto: CreateUserDto): Promise<Partial<User>>;
  abstract createUserAsRegular(dto: CreateUserDto): Promise<Partial<User>>;
  abstract changeRole(userId: string, newRole: User["role"]): Promise<Partial<User> | null>;
  abstract update(userId: string, update: UpdateQuery<User>): Promise<Partial<User> | null>;
  abstract getAllUsers(): Promise<Partial<User>[]>;
  abstract getUserById(userId: string): Promise<Partial<User> | null>;
  abstract login(email: string, password: string): Promise<{ user: Partial<User>; access_token: string } | null>;
  abstract sumCoins(userId: string, amount: number): Promise<Partial<User> | null>;
  abstract deductCoins(userId: string, amount: number): Promise<Partial<User> | null>;
}

