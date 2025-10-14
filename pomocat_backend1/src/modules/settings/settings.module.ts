import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Settings, SettingsSchema } from "./schemas/settings.schema";
import { SettingsController } from "./controllers/settings.controller";
import { SettingsService } from "./services/settings.service";
import { SETTINGS_REPO } from "./repository/settings.repo.interface";
import { SettingsRepository } from "./repository/settings.repo";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }]),
  ],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    { provide: SETTINGS_REPO, useClass: SettingsRepository },
  ],
  exports: [
    SettingsService,
    { provide: SETTINGS_REPO, useClass: SettingsRepository },
  ],
})
export class SettingsModule {}
