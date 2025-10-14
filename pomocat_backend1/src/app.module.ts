import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { DailyPlansModule } from './modules/daily-plans/daily-plans.module';
import { ShopModule } from './modules/shop/shop.module';
import { ItemsModule } from './modules/items/items.module';
import { PomodoroModule } from './modules/pomodoro/pomodoro.module';
import { PetModule } from './modules/pet/pet.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ScheduleModule } from '@nestjs/schedule';
import { InventoryModule } from './modules/inventory/inventory.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get('MONGODB_URI'),
        dbName: 'PomoCatDb',
        serverSelectionTimeoutMS: 5000,
      }),
    }),
    AuthModule,
    TasksModule,
    DailyPlansModule,
    ShopModule,
    ItemsModule,
    PomodoroModule,
    PetModule,
    SettingsModule,
    ScheduleModule.forRoot(),
    TasksModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
