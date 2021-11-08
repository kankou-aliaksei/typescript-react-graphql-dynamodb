import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput, ListItemOutput } from './item.dto';
import { ItemRepository } from './item.repository';

export class ItemService {
  public constructor(private readonly itemRepository: ItemRepository) {
  }

  public delete = async (input: DeleteItemInput): Promise<boolean> => {
    const item: ItemDto = await this.itemRepository.get(input);

    if (!item) {
      return false;
    }

    await this.itemRepository.delete(input);

    return true;
  }

  public get = async (input: GetItemInput): Promise<ItemDto> => this.itemRepository.get(input);

  public list = async (input: ListItemInput): Promise<ListItemOutput> => this.itemRepository.list(input);

  public save = async (input: ItemDto): Promise<ItemDto> => this.itemRepository.save(input);
}
