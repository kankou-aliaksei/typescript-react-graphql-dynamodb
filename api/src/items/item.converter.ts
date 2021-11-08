import { ItemDto } from './item.dto';
import { ItemEntity } from './item.entity.factory';

export class ItemConverter {
  public dtoToModel = (dto: ItemDto): ItemEntity => {
    if (!dto.id) {
      throw new Error('Error: DTO => Model. DTO ID field is missing');
    }

    if (!dto.createdAt) {
      throw new Error('Error: DTO => Model. DTO createdAt field is missing');
    }

    return {
      createdAt: dto.createdAt,
      description: dto.description,
      entityName: 'Item',
      id: dto?.id,
      name: dto.name
    };
  }

  public modelToDto = (model: ItemEntity): ItemDto => {
    if (!model) {
      return model;
    }

    const item: ItemDto = {
      createdAt: model.createdAt,
      id: model.id,
      name: model.name
    };

    if (model.description) {
      item.description = model.description;
    }

    return item;
  }
}
