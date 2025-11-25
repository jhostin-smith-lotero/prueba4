import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "./schemas/user.schema";
import { AuthService } from "./services/auth.service";
import { AuthRepository } from "./repository/Auth.repository";
import { IAuthRepository } from "./repository/Auth.repository.interface";
import { AuthController } from "./controllers/auth.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secretKey",
      signOptions: { expiresIn: "7d" },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    { provide: IAuthRepository, useClass: AuthRepository },
  ],
  exports: [
    AuthService,
    { provide: IAuthRepository, useClass: AuthRepository },
    MongooseModule,
  ],
})
export class AuthModule {}
