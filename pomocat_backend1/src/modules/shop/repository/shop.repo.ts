import { Injectable, Inject } from "@nestjs/common";
import { Inventory } from "src/modules/inventory/schemas/inventory.schema";
import { InventoryService } from "src/modules/inventory/services/inventory.service";
import { ItemsService } from "src/modules/items/services/items.service";
import { AuthService } from "src/modules/auth/services/auth.service";
import { SHOP_REPO, IShopRepository } from "./shop.repo.interface";

@Injectable()
export class ShopRepository implements IShopRepository {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly itemsService: ItemsService,
    private readonly authService: AuthService,
  ) {}

  async purchaseItem(itemId: string, userId: string): Promise<Inventory | null> {
    
    const itemPrice = await this.itemsService.getPrice(itemId);
    if (itemPrice == null) return null;

    
    const user = await this.authService.getUserById(userId);
    if (!user || typeof (user as any).coins !== "number") return null;

    const coins = (user as any).coins as number;
    if (coins < itemPrice) return null;

    
    await this.authService.updateUser(userId, { coins: coins - itemPrice } as any);


    return this.inventoryService.create({ userId, itemId } as any);
  }
}
