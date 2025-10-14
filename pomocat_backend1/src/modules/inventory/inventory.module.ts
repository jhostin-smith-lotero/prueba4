import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { InventoryController } from './controllers/inventory.controller';
import { InventoryRepository } from './repository/inventory.repository';
import { IInventoryRepository } from './repository/inventory.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema }]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, 
    { provide: IInventoryRepository, useClass: InventoryRepository },
  ],
  exports: [InventoryService,
    { provide: IInventoryRepository, useClass: InventoryRepository }
  ],
})
export class InventoryModule {}
