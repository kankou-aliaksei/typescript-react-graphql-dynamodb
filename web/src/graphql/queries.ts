/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
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
export const listItem = /* GraphQL */ `
  query ListItem($input: ListItemInput!) {
    listItem(input: $input) {
      result {
        items {
          id
          name
          description
          createdAt
        }
        nextToken
      }
      success
      error {
        code
        message
      }
    }
  }
`;
