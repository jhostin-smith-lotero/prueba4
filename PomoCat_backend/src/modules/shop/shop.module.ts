import { Module } from '@nestjs/common';
import { InventoryModule } from '../inventory/inventory.module';
import { ItemsModule } from '../items/items.module';
import { AuthModule } from '../auth/auth.module';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';
import { SHOP_REPO } from './repository/shop.repo.interface';
import { ShopRepository } from './repository/shop.repo';

@Module({
  imports: [
    InventoryModule, 
    ItemsModule,     
    AuthModule,      
  ],
  controllers: [ShopController],
  providers: [
    ShopService,
    { provide: SHOP_REPO, useClass: ShopRepository }, 
  ],
  exports: [ShopService],
})
export class ShopModule {}


