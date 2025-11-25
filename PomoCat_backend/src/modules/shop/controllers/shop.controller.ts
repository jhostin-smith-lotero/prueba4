import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateInventoryDto } from 'src/modules/inventory/dto/create-inventory.dto';
import { InventoryService } from 'src/modules/inventory/services/inventory.service';
import { ShopService } from '../services/shop.service';



@Controller('shop')
export class ShopController {
  constructor(private readonly inventoryService: InventoryService,
    private readonly shopService: ShopService,
  ) {}

  @Post('purchase/:itemid/:userid')
  purchaseItem(@Param('itemid') itemId: string, @Param('userid') userId: string) {
    return this.shopService.purchaseItem(itemId, userId);
  }

  @Get('items')
  findAllItems() {
    return this.inventoryService.findAll();
  }

  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

}
