import { ApiHandler, Request, Response } from '../shared/api.interfaces';
import { ItemConfig } from './item.config';
import { ItemController } from './item.controller';
import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput } from './item.dto';

const config: ItemConfig = new ItemConfig();

const controller: ItemController = config.getController();

export const saveItem: ApiHandler<Request<ItemDto>> =
  (request: Request<ItemDto>): Promise<Response> => controller.saveItem(request.input);
export const getItem: ApiHandler<GetItemInput> = controller.getItem;
export const listItem: ApiHandler<Request<ListItemInput>> =
  (request: Request<ListItemInput>): Promise<Response> => controller.listItem(request.input);
export const deleteItem: ApiHandler<DeleteItemInput> = controller.deleteItem;
