import { GetItemOutput, QueryOutput } from 'aws-sdk/clients/dynamodb';
import { queryOptions } from 'dynamodb-toolbox/dist/classes/Table';
import { v4 as uuid } from 'uuid';
import { decodeKey, encodeKey } from '../util/base64';
import { ItemConverter } from './item.converter';
import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput, ListItemOutput } from './item.dto';
import { ItemEntity, ItemEntityFactory } from './item.entity.factory';

export class ItemRepository {
  public constructor(private readonly converter: ItemConverter, private readonly entity: ItemEntityFactory) {
  }

  public delete = async (input: DeleteItemInput): Promise<void> => {
    await this.entity.getEntity().delete(input);
  }

  public get = async (input: GetItemInput): Promise<ItemDto> => {
    const getItemOutput: GetItemOutput =
      await this.entity.getEntity().get(input) as unknown as GetItemOutput;

    return this.converter.modelToDto(getItemOutput.Item as unknown as ItemEntity);
  }

  public list = async (input: ListItemInput): Promise<ListItemOutput> => {
    const options: queryOptions = {
      filters: [],
      index: 'createdAt-index'
    };

    if (input.page && input.page.startToken) {
      options.startKey = decodeKey(input.page.startToken);
    }

    if (input.page && input.page.size) {
      options.limit = input.page.size;
    }

    if (input.filter && input.filter.fromTs && input.filter.toTs) {
      options.between = [input.filter.fromTs, input.filter.toTs];
    } else if (input.filter && input.filter.fromTs) {
      options.gte = input.filter.fromTs;
    } else if (input.filter && input.filter.toTs) {
      options.lte = input.filter.toTs;
    }

    const itemsResponse: QueryOutput =
      await this.entity.getEntity().query('Item', options) as unknown as QueryOutput;

    const items: ItemEntity[] = itemsResponse.Items as unknown as ItemEntity[];

    const response: ListItemOutput = {
      items: items.map(this.converter.modelToDto)
    };

    if (itemsResponse.LastEvaluatedKey) {
      response.nextToken = encodeKey(itemsResponse.LastEvaluatedKey);
    }

    return response;
  }

  public save = async (input: ItemDto): Promise<ItemDto> => {
    const itemDto: ItemDto = { ...input, id: uuid(), createdAt: Date.now() };

    const itemModel: ItemEntity = this.converter.dtoToModel(itemDto);

    await this.entity.getEntity().put({ ...itemModel });

    return itemDto;
  }
}
