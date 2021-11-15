module.exports = {
  tables: [
    {
      TableName: 'todo-list-items',
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'entityName', AttributeType: 'S' },
        { AttributeName: 'name', AttributeType: 'S' },
        { AttributeName: 'description', AttributeType: 'S' },
        { AttributeName: 'createdAt', AttributeType: 'N' }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'createdAt-index',
          KeySchema: [
            {
              AttributeName: 'entityName',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          }
        }
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
      data: [
        {
          id: 'f4e22d8a-9468-4819-a44f-af2bdcd2a1e9',
          name: 'name',
          entityName: 'Item',
          createdAt: 1234
        },
        {
          id: '10ca1f4f-5e2d-4afd-8364-6d0895889fa9',
          name: 'name 1',
          entityName: 'Item',
          createdAt: 1235
        },
        {
          id: '2f7630c8-0bb7-44c2-b3b6-65aacd32aece',
          name: 'name 2',
          entityName: 'Item',
          createdAt: 1236
        },
        {
          id: '8e498b0c-01b7-4968-b0c2-e1586c4ce116',
          name: 'name 3',
          entityName: 'Item',
          createdAt: 1237
        }
      ]
    }
  ]
};
