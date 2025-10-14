import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { IItemsRepository } from '../repository/items.repository.interface';

@Injectable()
export class ItemsService {
  constructor(@Inject(IItemsRepository) private readonly itemsRepository: IItemsRepository) {}

  async create(createItemDto: CreateItemDto) {
    return this.itemsRepository.create(createItemDto as any);
  }
  async findAll() {
    return this.itemsRepository.findAll();
  }
  async findAllValid() {
    return this.itemsRepository.findAllValid();
  }
  async findOne(id: string) {
    return this.itemsRepository.findOne(id);
  }
  async update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemsRepository.update(id, updateItemDto as any);
  }
  async remove(id: string) {
    return this.itemsRepository.remove(id);
  }

  async getPrice(id: string): Promise<number | null> {
    return this.itemsRepository.getPrice(id);
  }
}
