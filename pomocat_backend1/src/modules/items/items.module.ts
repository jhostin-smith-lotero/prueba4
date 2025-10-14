import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';
import { ItemsRepository } from './repository/items.repository';
import { IItemsRepository } from './repository/items.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [
    ItemsService,
    { provide: IItemsRepository, useClass: ItemsRepository },
  ],
  exports: [ItemsService,
    { provide: IItemsRepository, useClass: ItemsRepository }
  ],
})
export class ItemsModule {}
