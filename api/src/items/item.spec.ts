import AWS from 'aws-sdk';

const config: ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions & { endpoint: string } = {
  endpoint: process.env.MOCK_DYNAMODB_ENDPOINT as string,
  region: 'local',
  sslEnabled: false
};

AWS.config.update(config);

import { APIVersions } from 'aws-sdk/lib/config';
import { ConfigurationOptions } from 'aws-sdk/lib/config-base';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import { createTables, deleteTables } from 'jest-dynalite';
import { Request, Response, ResponseWithResult } from '../shared/api.interfaces';
import { deleteItem, getItem, listItem, saveItem } from './item';
import { DeleteItemInput, GetItemInput, ItemDto, ListItemInput, ListItemOutput } from './item.dto';

chai.use(deepEqualInAnyOrder);

describe('Item', () => {

  beforeEach(async () => {
    await deleteTables();
    await createTables();
  });

  describe('getItem function', () => {

    it('should return an expected item', async () => {
      const input: GetItemInput = {
        id: 'f4e22d8a-9468-4819-a44f-af2bdcd2a1e9'
      };

      const response: Response = await getItem(input);

      const expectedResponse: ResponseWithResult<ItemDto> = {
        result: {
            createdAt: 1234,
            id: 'f4e22d8a-9468-4819-a44f-af2bdcd2a1e9',
            name: 'name'
        },
        success: true
      };

      chai.expect(expectedResponse).to.deep.equalInAnyOrder(response);
    });

    it('should return the BAD_REQUEST error code', async () => {
      const input: GetItemInput = {
        id: ''
      };

      const response: Response = await getItem(input);

      chai.expect(response.success).to.deep.equalInAnyOrder(false);
      chai.expect(response.error?.code).to.eq('BAD_REQUEST');
    });

    it('should return the NOT_FOUND error code', async () => {
      const input: GetItemInput = {
        id: '1'
      };

      const response: Response = await getItem(input);

      chai.expect(response.success).to.deep.equalInAnyOrder(false);
      chai.expect(response.error?.code).to.eq('NOT_FOUND');
    });
  });

  describe('deleteItem function', () => {

    it('should delete an item', async () => {
      const request: Request<ItemDto> = {
        input: {
          name: 'New name'
        }
      };

      const saveResponse: Response = await saveItem(request);

      const id: string = (saveResponse as ResponseWithResult<ItemDto>).result.id as string;

      const deleteResponse: Response = await deleteItem({ id });

      chai.expect(deleteResponse.success).to.eq(true);
    });

    it('should return the BAD_REQUEST error code', async () => {
      const input: DeleteItemInput = {
        id: ''
      };

      const response: Response = await deleteItem(input);

      chai.expect(response.success).to.deep.equalInAnyOrder(false);
      chai.expect(response.error?.code).to.eq('BAD_REQUEST');
    });

    it('should return the NOT_FOUND error code', async () => {
      const input: DeleteItemInput = {
        id: '1'
      };

      const response: Response = await deleteItem(input);

      chai.expect(response.success).to.deep.equalInAnyOrder(false);
      chai.expect(response.error?.code).to.eq('NOT_FOUND');
    });
  });

  describe('saveItem function', () => {

    it('should save an item', async () => {
      const request: Request<ItemDto> = {
        input: {
          name: 'New name'
        }
      };

      const saveResponse: Response = await saveItem(request);

      chai.expect((saveResponse as ResponseWithResult<ItemDto>).result.name).to.eq(request.input.name);
      chai.expect(saveResponse.success).to.eq(true);
    });

    it('should return the BAD_REQUEST error code', async () => {
      const request: Request<ItemDto> = {
        input: {
          name: ''
        }
      };

      const response: Response = await saveItem(request);

      chai.expect(response.success).to.eq(false);
      chai.expect(response.error?.code).to.eq('BAD_REQUEST');
    });
  });

  describe('listItem function', () => {

    it('should list all items', async () => {
      const request: Request<ListItemInput> = {
        input: {
        }
      };

      const response: Response = await listItem(request);

      const items: ItemDto[] = (response as ResponseWithResult<ListItemOutput>).result.items;

      const expectedItems: ItemDto[] = [
        {
          createdAt: 1234,
          id: 'f4e22d8a-9468-4819-a44f-af2bdcd2a1e9',
          name: 'name'
        },
        {
          createdAt: 1235,
          id: '10ca1f4f-5e2d-4afd-8364-6d0895889fa9',
          name: 'name 1'
        },
        {
          createdAt: 1236,
          id: '2f7630c8-0bb7-44c2-b3b6-65aacd32aece',
          name: 'name 2'
        },
        {
          createdAt: 1237,
          id: '8e498b0c-01b7-4968-b0c2-e1586c4ce116',
          name: 'name 3'
        }
      ];

      chai.expect(items).to.deep.equalInAnyOrder(expectedItems);
    });

    it('should list all items by filter (fromTs - ...)', async () => {
      const request: Request<ListItemInput> = {
        input: {
          filter: {
            fromTs: 1236
          }
        }
      };

      const response: Response = await listItem(request);

      const items: ItemDto[] = (response as ResponseWithResult<ListItemOutput>).result.items;

      const expectedItems: ItemDto[] = [
        {
          createdAt: 1236,
          id: '2f7630c8-0bb7-44c2-b3b6-65aacd32aece',
          name: 'name 2'
        },
        {
          createdAt: 1237,
          id: '8e498b0c-01b7-4968-b0c2-e1586c4ce116',
          name: 'name 3'
        }
      ];

      chai.expect(items).to.deep.equalInAnyOrder(expectedItems);
    });

    it('should list all items by filter (... - toTs)', async () => {
      const request: Request<ListItemInput> = {
        input: {
          filter: {
            toTs: 1236
          }
        }
      };

      const response: Response = await listItem(request);

      const items: ItemDto[] = (response as ResponseWithResult<ListItemOutput>).result.items;

      const expectedItems: ItemDto[] = [
        {
          createdAt: 1234,
          id: 'f4e22d8a-9468-4819-a44f-af2bdcd2a1e9',
          name: 'name'
        },
        {
          createdAt: 1235,
          id: '10ca1f4f-5e2d-4afd-8364-6d0895889fa9',
          name: 'name 1'
        },
        {
          createdAt: 1236,
          id: '2f7630c8-0bb7-44c2-b3b6-65aacd32aece',
          name: 'name 2'
        }
      ];

      chai.expect(items).to.deep.equalInAnyOrder(expectedItems);
    });

    it('should list all items by filter (from - to)', async () => {
      const request: Request<ListItemInput> = {
        input: {
          filter: {
            fromTs: 1235,
            toTs: 1236
          }
        }
      };

      const response: Response = await listItem(request);

      const items: ItemDto[] = (response as ResponseWithResult<ListItemOutput>).result.items;

      const expectedItems: ItemDto[] = [
        {
          createdAt: 1235,
          id: '10ca1f4f-5e2d-4afd-8364-6d0895889fa9',
          name: 'name 1'
        },
        {
          createdAt: 1236,
          id: '2f7630c8-0bb7-44c2-b3b6-65aacd32aece',
          name: 'name 2'
        }
      ];

      chai.expect(items).to.deep.equalInAnyOrder(expectedItems);
    });
  });
});
