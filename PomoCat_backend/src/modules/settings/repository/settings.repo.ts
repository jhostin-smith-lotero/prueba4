import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery } from "mongoose";
import { Settings, SettingsDocument } from "../schemas/settings.schema";
import type { ISettingsRepository } from "./settings.repo.interface";

@Injectable()
export class SettingsRepository implements ISettingsRepository {
  constructor(
    @InjectModel(Settings.name) private readonly settingsModel: Model<SettingsDocument>,
  ) {}

  create(settings: Partial<Settings>, userId: string): Promise<SettingsDocument> {
    return this.settingsModel.create({ ...settings, userId });
  }

  findByUserId(userId: string): Promise<SettingsDocument | null> {
    return this.settingsModel.findOne({ userId }).exec();
  }

  updateByUserId(userId: string, update: UpdateQuery<Settings>): Promise<SettingsDocument | null> {
    return this.settingsModel.findOneAndUpdate({ userId }, update, { new: true }).exec();
  }

  deleteByUserId(userId: string): Promise<SettingsDocument | null> {
    return this.settingsModel.findOneAndDelete({ userId }).exec();
  }

    findAll(filter: Partial<Settings> = {}): Promise<SettingsDocument[]> {
    return this.settingsModel.find(filter).exec();
    }

    findById(id: string): Promise<SettingsDocument | null> {
    return this.settingsModel.findById(id).exec();
    }

    updateById(id: string, update: UpdateQuery<Settings>): Promise<SettingsDocument | null> {
    return this.settingsModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    deleteById(id: string): Promise<SettingsDocument | null> {
    return this.settingsModel.findByIdAndDelete(id).exec();
    }
}
