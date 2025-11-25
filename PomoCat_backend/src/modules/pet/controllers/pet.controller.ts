import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PetService } from '../services/pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

 @Post('new/:userId')
 create(@Body() dto: CreatePetDto, @Param('userId') userId: string) {
  return this.petService.create(dto, userId);
}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(id);
  }


  @Patch(':userId')
  updateMyPet(@Param('userId') userId: string, @Body() body: UpdatePetDto) {
    return this.petService.update(userId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(id);
  }
}
