import { ErrorResponse } from '../shared/api.interfaces';
import { ResponseBuilder } from '../shared/response-builder';
import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput } from './item.dto';

export class ItemValidator {
  public validateDeleteItemInput = (input: DeleteItemInput): ErrorResponse => {
    if (input.id === '') {
      return ResponseBuilder.badRequestError('The ID is empty');
    }
    return undefined;
  }

  public validateGetItemInput = (input: GetItemInput): ErrorResponse => {
    if (input.id === '') {
      return ResponseBuilder.badRequestError('The ID is empty');
    }
    return undefined;
  }

  public validateListItemInput = (input: ListItemInput): ErrorResponse => {
    if (input.page && input.page.size && input.page.size <= 0) {
      return ResponseBuilder.badRequestError('The page size can be greater than zero');
    }
    return undefined;
  }

  public validateSaveItemInput = (input: ItemDto): ErrorResponse => {
    if (input.name === '') {
      return ResponseBuilder.badRequestError('The \'name\' is empty');
    }
    return undefined;
  }
}
