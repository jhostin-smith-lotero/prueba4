// src/modules/inventory/services/inventory.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IInventoryRepository } from '../repository/inventory.repository.interface';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(IInventoryRepository)                  
    private readonly repo: IInventoryRepository,   
  ) {}

  create(dto: CreateInventoryDto) {
    return this.repo.create(dto);
  }

  findAll() { return this.repo.findAll(); }

  async findOne(id: string) {
    const doc = await this.repo.findByOne(id);
    if (!doc) throw new NotFoundException('Inventory not found');
    return doc;
  }

  async findByUserIdAndItemId(userId: string, itemId: string) {
    const doc = await this.repo.findByUserIdAndItemId(userId, itemId);
    if (!doc) throw new NotFoundException('Inventory not found');
    return doc;
  }

  async update(id: string, dto: UpdateInventoryDto) {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Inventory not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.repo.remove(id);
    if (!deleted) throw new NotFoundException('Inventory not found');
    return { deleted: true };
  }
}
