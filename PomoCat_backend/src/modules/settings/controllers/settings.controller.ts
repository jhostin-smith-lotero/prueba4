import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateSettingDto } from '../dto/create-setting.dto';
import { UpdateSettingDto } from '../dto/update-setting.dto';
import { SettingsService } from '../services/settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post('user/:userId')
  create(@Body() dto: CreateSettingDto, @Param('userId') userId: string) {
    return this.settingsService.create(dto, userId);
  }

  @Get()
  findAllSettings() {
    return this.settingsService.findAllSettings();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.settingsService.findAll(userId);
  }

  @Patch('user/:userId')
  updateByUser(@Param('userId') userId: string, @Body() dto: UpdateSettingDto) {
    return this.settingsService['repo'].updateByUserId(userId, dto); 
  }

  @Delete('user/:userId')
  deleteByUser(@Param('userId') userId: string) {
    return this.settingsService['repo'].deleteByUserId(userId);
  }
}
