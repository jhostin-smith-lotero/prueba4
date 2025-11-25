import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Get('user/:userId/item/:itemId')
  findByUserIdAndItemId(@Param('userId') userId: string, @Param('itemId') itemId: string) {
    return this.inventoryService.findByUserIdAndItemId(userId, itemId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }
}
