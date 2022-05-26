import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../../functions/people/functions/getAllPersonas';

const mockDynamoDbScan = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({});
    },
  };
});

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        scan: mockDynamoDbScan,
      })),
    },
  };
});

test('Should return all personas its be defined', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_PERSONAS_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
  };
  const context = {} as Context;
  const response = await handler(event, context);
  expect(response).toBeDefined();
});
