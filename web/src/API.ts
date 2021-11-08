/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SaveItemInput = {
  name: string,
  description?: string | null,
};

export type ItemOutput = {
  __typename: "ItemOutput",
  result?: ItemDto | null,
  success: boolean,
  error?: Error | null,
};

export type BaseOutput = {
  __typename: "BaseOutput",
  success: boolean,
  error?: Error | null,
};

export type ListItemOutput = {
  __typename: "ListItemOutput",
  result?: ListItemResult | null,
  success: boolean,
  error?: Error | null,
};

export type ListItemResult = {
  __typename: "ListItemResult",
  items?:  Array<ItemDto | null > | null,
  nextToken?: string | null,
};

export type ItemDto = {
  __typename: "ItemDto",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
};

export type Error = {
  __typename: "Error",
  code: string,
  message: string,
};

export type DeleteItemOutput = {
  __typename: "DeleteItemOutput",
  result: ItemId,
  success: boolean,
  error?: Error | null,
};

export type ItemId = {
  __typename: "ItemId",
  id: string,
};

export type ListItemInput = {
  filter?: Filter | null,
  page?: Page | null,
};

export type Filter = {
  fromTs?: string | null,
  toTs?: string | null,
};

export type Page = {
  size?: number | null,
  startToken?: string | null,
};

export type SaveItemMutationVariables = {
  input: SaveItemInput,
};

export type SaveItemMutation = {
  saveItem:  {
    __typename: "ItemOutput",
    result?:  {
      __typename: "ItemDto",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
    } | null,
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};

export type DeleteItemMutationVariables = {
  id: string,
};

export type DeleteItemMutation = {
  deleteItem:  {
    __typename: "DeleteItemOutput",
    result:  {
      __typename: "ItemId",
      id: string,
    },
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem:  {
    __typename: "ItemOutput",
    result?:  {
      __typename: "ItemDto",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
    } | null,
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};

export type ListItemQueryVariables = {
  input: ListItemInput,
};

export type ListItemQuery = {
  listItem:  {
    __typename: "ListItemOutput",
    result?:  {
      __typename: "ListItemResult",
      items?:  Array< {
        __typename: "ItemDto",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};

export type OnSaveItemSubscription = {
  onSaveItem:  {
    __typename: "ItemOutput",
    result?:  {
      __typename: "ItemDto",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
    } | null,
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};

export type OnDeleteItemSubscription = {
  onDeleteItem:  {
    __typename: "DeleteItemOutput",
    result:  {
      __typename: "ItemId",
      id: string,
    },
    success: boolean,
    error?:  {
      __typename: "Error",
      code: string,
      message: string,
    } | null,
  },
};
