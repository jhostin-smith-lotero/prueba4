// auth/controllers/auth.controller.ts
import { 
  Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards 
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserRole } from '../schemas/user.schema';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/shared/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Admin crea admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @Post('register-admin')
  registerAdmin(@Body() body: CreateUserDto) {
    // Si quieres autologin al registrarse, puedes generar token aquí.
    return this.authService.createUserAsAdmin(body);
  }

  // Registro público usuario regular
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.createUserAsRegular(body);
  }

  // Cambiar rol (solo admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('change-role/:id')
  changeRole(@Param('id') userId: string, @Body() body: { role: UserRole }) {
    return this.authService.changeUserRole(userId, body.role);
  }

  // Listar usuarios (solo admin)
  @Get('users')
  findAllUsers() {
    return this.authService.getAllUsers();
  }

  // Ver un usuario (admin o podrías permitir al propio usuario)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('users/:id')
  findUserById(@Param('id') userId: string) {
    return this.authService.getUserById(userId);
  }

  // Login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
}
