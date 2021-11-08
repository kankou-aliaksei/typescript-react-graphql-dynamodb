export interface ItemDto {
  createdAt?: number;
  description?: string;
  id?: string;
  name: string;
}

export interface GetItemInput {
  id: string;
}

export interface DeleteItemInput {
  id: string;
}

export interface ListItemFilter {
  fromTs?: number;
  toTs?: number;
}

export interface ListItemInput {
  filter?: ListItemFilter;
  page?: {
    size?: number;
    startToken?: string;
  };
}

export interface ListItemOutput {
  items: ItemDto[];
  nextToken?: string;
}
