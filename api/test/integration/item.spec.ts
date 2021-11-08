import * as AWS from 'aws-sdk';
import { expect } from 'chai';
import { gql, GraphQLClient } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { ResponseWithResult } from '../../shared/api.interfaces';
import { ItemDto } from '../../src/items/item.dto';
import { Cognito } from '../util/cognito';
import { DeleteItemResponse, GetItemResponse, SaveItemResponse } from './item.model';

const ssm: AWS.SSM = new AWS.SSM();

describe('Item Integration Test', () => {

  it('should save and get an expected item', async () => {
    const graphqlUrl: string = (await ssm.getParameter({
      Name: '/graphql/url'
    }).promise()).Parameter?.Value as string;

    const cognito: Cognito = new Cognito();
    const token: string = await cognito.getUserToken();

    const client: GraphQLClient = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: token
      }
    });

    let itemId: string | undefined;

    try {
      const itemName: string = 'Integration test';

      const saveItemMutation: RequestDocument = gql`
        mutation SaveItem($name: String!) {
          saveItem(input: { name: $name }) {
            result {
              id
            }
            success
          }
        }
      `;

      const saveItemResponse: SaveItemResponse<ResponseWithResult<ItemDto>> = await client
        .request<SaveItemResponse<ResponseWithResult<ItemDto>>>(saveItemMutation, { name: itemName });

      expect(saveItemResponse.saveItem.success).to.eq(true);

      itemId = saveItemResponse.saveItem.result.id;

      const getItemQuery: RequestDocument = gql`
        {
          getItem(id: "${itemId}") {
            result {
              name
            }
          }
        }
      `;

      const getItemResponse: GetItemResponse<ResponseWithResult<ItemDto>> =
        await client.request<GetItemResponse<ResponseWithResult<ItemDto>>>(getItemQuery);

      expect(getItemResponse.getItem.result.name).to.eq(itemName);
    } catch (e) {
      throw e;
    } finally {
      await cognito.destroy();
      if (token && itemId) {
        const saveItemMutation: RequestDocument = gql`
          mutation DeleteItem($id: ID!) {
            deleteItem(id: $id) {
              success
            }
          }
        `;

        const deleteItemResponse: DeleteItemResponse<ResponseWithResult<ItemDto>> = await client
          .request<DeleteItemResponse<ResponseWithResult<ItemDto>>>(saveItemMutation, { id: itemId });

        expect(deleteItemResponse.deleteItem.success).to.eq(true);
      }
    }
  });
});
