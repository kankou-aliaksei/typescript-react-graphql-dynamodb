import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import * as log from 'loglevel';
import { ItemController } from './item.controller';
import { ItemConverter } from './item.converter';
import { ItemEntityFactory } from './item.entity.factory';
import { ItemRepository } from './item.repository';
import { ItemService } from './item.service';
import { ItemValidator } from './item.validator';

const LOG_LEVEL: log.LogLevelDesc = process.env.LOG_LEVEL
  ? (process.env.LOG_LEVEL as log.LogLevelDesc)
  : 'INFO';

export class ItemConfig {
  public getController = (): ItemController =>
    new ItemController(this.getService(), this.getValidator(), this.getLogger())

  public getConverter = (): ItemConverter => new ItemConverter();

  public getDynamoDbClient = (): DocumentClient => new AWS.DynamoDB.DocumentClient();

  public getEntityFactory = (): ItemEntityFactory => new ItemEntityFactory(this.getDynamoDbClient());

  public getLogger = (): log.RootLogger => {
    log.setLevel(LOG_LEVEL);
    return log;
  }

  public getRepository = (): ItemRepository => new ItemRepository(this.getConverter(), this.getEntityFactory());

  public getService = (): ItemService => new ItemService(this.getRepository());

  public getValidator = (): ItemValidator => new ItemValidator();
}
