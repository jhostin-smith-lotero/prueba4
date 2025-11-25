import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User, UserDocument, UserRole } from "../schemas/user.schema";
import { IAuthRepository } from "../repository/Auth.repository.interface";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private readonly authRepository: IAuthRepository, 
  ) {}

  hashPassword(password: string) {
    return this.authRepository.hashPassword(password);
  }

  sanitize(user: UserDocument) {
    return this.authRepository.sanitize(user);
  }

  createUserAsAdmin(dto: CreateUserDto) {
    return this.authRepository.createUserAsAdmin(dto);
  }

  createUserAsRegular(dto: CreateUserDto) {
    return this.authRepository.createUserAsRegular(dto);
  }

  changeUserRole(userId: string, newRole: UserRole) {
    return this.authRepository.changeRole(userId, newRole);
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    return this.authRepository.update(userId, dto as any);
  }

  getAllUsers() {
    return this.authRepository.getAllUsers();
  }

  getUserById(userId: string) {
    return this.authRepository.getUserById(userId);
  }

  async login(dto: LoginUserDto) {
    const res = await this.authRepository.login(dto.email, dto.password);
    if (!res) throw new UnauthorizedException("Invalid email or password");
    return res;
  }

  async sumCoins(userId: string, coins: number) {
    return this.authRepository.sumCoins(userId, coins);
  }
}
