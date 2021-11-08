import { DynamoDB } from 'aws-sdk';

export const encodeKey: (data: DynamoDB.Key) => string = (data: DynamoDB.Key): string =>
  Buffer.from(JSON.stringify(data)).toString('base64');
export const decodeKey: (data: string) => DynamoDB.Key = (data: string): DynamoDB.Key =>
  JSON.parse(Buffer.from(data, 'base64').toString()) as DynamoDB.Key;
