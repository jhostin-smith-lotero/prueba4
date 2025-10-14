import { UpdateQuery, FilterQuery } from "mongoose";
import { Settings, SettingsDocument } from "../schemas/settings.schema";

export const SETTINGS_REPO = Symbol("SETTINGS_REPO");

export interface ISettingsRepository {
  create(settings: Partial<Settings>, userId: string): Promise<SettingsDocument>;
  findByUserId(userId: string): Promise<SettingsDocument | null>;
  updateByUserId(userId: string, update: UpdateQuery<Settings>): Promise<SettingsDocument | null>;
  deleteByUserId(userId: string): Promise<SettingsDocument | null>;
  findAll(filter?: FilterQuery<Settings>): Promise<SettingsDocument[]>;
  findById(id: string): Promise<SettingsDocument | null>; 
  updateById(id: string, update: UpdateQuery<Settings>): Promise<SettingsDocument | null>; 
  deleteById(id: string): Promise<SettingsDocument | null>; 
}
