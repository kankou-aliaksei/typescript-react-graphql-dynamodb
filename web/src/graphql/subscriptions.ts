/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onSaveItem = /* GraphQL */ `
  subscription OnSaveItem {
    onSaveItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
