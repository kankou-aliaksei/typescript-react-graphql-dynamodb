import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { Entity, Table } from 'dynamodb-toolbox';

const ITEMS_DYNAMO_DB_TABLE: string = process.env.ITEMS_DYNAMO_DB_TABLE || '';

export interface ItemEntity {
  createdAt: number;
  description?: string;
  entityName: string;
  id: string;
  name: string;
}

export class ItemEntityFactory {
  private readonly entity: Entity<ItemEntity>;

  public constructor(private readonly documentClient: DocumentClient) {
    const table: Table = new Table({
      DocumentClient: this.documentClient,
      indexes: {
        'createdAt-index': {
          partitionKey: 'entityName',
          sortKey: 'createdAt'
        },
      },
      name: ITEMS_DYNAMO_DB_TABLE,
      partitionKey: 'id'
    });

    this.entity = new Entity<ItemEntity>({
      attributes: {
        createdAt: { type: 'number' },
        description: { type: 'string' },
        entityName: { type: 'string' },
        id: { partitionKey: true, type: 'string' },
        name: { type: 'string' }
      },
      name: 'Item',
      table
    });
  }

  public getEntity(): Entity<ItemEntity> {
    return this.entity;
  }
}
