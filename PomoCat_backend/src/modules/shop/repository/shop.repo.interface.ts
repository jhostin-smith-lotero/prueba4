import { Inventory } from "src/modules/inventory/schemas/inventory.schema";

export const SHOP_REPO = Symbol("SHOP_REPO");

export interface IShopRepository {
  purchaseItem(itemId: string, userId: string): Promise<Inventory | null>;
}
