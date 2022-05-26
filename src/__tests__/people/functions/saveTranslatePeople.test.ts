import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../../functions/people/functions/saveTranslatePeople';

const mockDynamoDbPut = jest.fn().mockImplementation(() => {
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
        put: mockDynamoDbPut,
      })),
    },
  };
});

test('should save persona', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;
  const createPersona = await handler(event, context);

  expect(createPersona.statusCode).toEqual(201);
});

test('should response save persone to be Defined', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;
  const createPersona = await handler(event, context);
  expect(createPersona).toBeDefined();
});
