import { Inject, Injectable } from "@nestjs/common";
import { SETTINGS_REPO } from "../repository/settings.repo.interface";
import type { ISettingsRepository } from "../repository/settings.repo.interface";
import { CreateSettingDto } from "../dto/create-setting.dto";
import { UpdateSettingDto } from "../dto/update-setting.dto";

@Injectable()
export class SettingsService {
  constructor(
    @Inject(SETTINGS_REPO) private readonly repo: ISettingsRepository,
  ) {}

  async create(dto: CreateSettingDto, userId: string) {
    const existing = await this.repo.findByUserId(userId);
    if (existing) {
      return this.repo.updateByUserId(userId, dto);
    }
    return this.repo.create(dto, userId);
  }

  async findAllSettings() {
    return this.repo.findAll();
  }

  
  findAll(userId: string) {
    return this.repo.findByUserId(userId); 
  }

  async findOne(id: string) {
    return this.repo.findById(id);
  }

  async update(id: string, dto: UpdateSettingDto) {
    return this.repo.updateById(id, dto);
  }

  async remove(id: string) {
    return this.repo.deleteById(id);
  }
}
