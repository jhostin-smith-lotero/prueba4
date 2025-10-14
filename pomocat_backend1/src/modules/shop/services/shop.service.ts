import { Inject, Injectable } from '@nestjs/common';
import { SHOP_REPO } from '../repository/shop.repo.interface';
import type { IShopRepository } from '../repository/shop.repo.interface';

@Injectable()
export class ShopService {
  constructor(
    @Inject(SHOP_REPO) private readonly repo: IShopRepository, 
  ) {}

  purchaseItem(itemId: string, userId: string) {
    return this.repo.purchaseItem(itemId, userId);
  }
}

