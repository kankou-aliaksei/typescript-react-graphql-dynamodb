/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const saveItem = /* GraphQL */ `
  mutation SaveItem($input: SaveItemInput!) {
    saveItem(input: $input) {
      result {
        id
        name
        description
        createdAt
      }
      success
      error {
        code
        message
      }
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      result {
        id
      }
      success
      error {
        code
        message
      }
    }
  }
`;
