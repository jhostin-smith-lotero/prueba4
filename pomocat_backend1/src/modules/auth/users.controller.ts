import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userModel.findById(id).exec();
  }
}
