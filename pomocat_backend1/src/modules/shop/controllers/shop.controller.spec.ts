import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { InventoryService } from '../inventory/services/inventory.service';

describe('ShopController', () => {
  let controller: ShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopController],
      providers: [InventoryService],
    }).compile();

    controller = module.get<ShopController>(ShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
