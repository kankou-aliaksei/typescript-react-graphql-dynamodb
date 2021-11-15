import { RootLogger } from 'loglevel';
import { ErrorResponse, Response } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput, ListItemOutput } from './item.dto';
import { ItemService } from './item.service';
import { ItemValidator } from './item.validator';

export class ItemController {
  public constructor(
    private readonly itemService: ItemService,
    private readonly validator: ItemValidator,
    private readonly log: RootLogger) {
  }

  public deleteItem = async (input: DeleteItemInput): Promise<Response> => {
    try {
      this.log.info('Input:', input);

      const errorResponse: ErrorResponse = this.validator.validateGetItemInput(input);
      if (errorResponse) {
        return errorResponse;
      }

      const isDeleted: boolean = await this.itemService.delete(input);

      if (!isDeleted) {
        return ResponseBuilder.notFound();
      }

      return ResponseBuilder.okWithResult<Partial<ItemDto>>(input);
    } catch (e) {
      this.log.error(e);
      return ResponseBuilder.internalServerError('An error occurred during deleting an item');
    }
  }

  public getItem = async (input: GetItemInput): Promise<Response> => {
    try {
      this.log.info('Input:', input);

      const errorResponse: ErrorResponse = this.validator.validateGetItemInput(input);
      if (errorResponse) {
        return errorResponse;
      }

      const item: ItemDto = await this.itemService.get(input);

      if (!item) {
        return ResponseBuilder.notFound();
      }

      return ResponseBuilder.okWithResult<ItemDto>(item);
    } catch (e) {
      this.log.error(e);
      return ResponseBuilder.internalServerError('An error occurred during getting an item');
    }
  }

  public listItem = async (input: ListItemInput): Promise<Response> => {
    try {
      this.log.info('Input:', input);

      const errorResponse: ErrorResponse = this.validator.validateListItemInput(input);
      if (errorResponse) {
        return errorResponse;
      }

      const listItemOutput: ListItemOutput = await this.itemService.list(input);

      return ResponseBuilder.okWithResult<ListItemOutput>(listItemOutput);
    } catch (e) {
      this.log.error(e);
      return ResponseBuilder.internalServerError('An error occurred during getting items');
    }
  }

  public saveItem = async (input: ItemDto): Promise<Response> => {
    try {
      this.log.debug('Input:', input);

      const errorResponse: ErrorResponse = this.validator.validateSaveItemInput(input);
      if (errorResponse) {
        return errorResponse;
      }

      const item: ItemDto = await this.itemService.save(input);

      return ResponseBuilder.okWithResult<ItemDto>(item);
    } catch (e) {
      this.log.error(e);
      return ResponseBuilder.internalServerError('An error occurred during saving an item');
    }
  }
}
