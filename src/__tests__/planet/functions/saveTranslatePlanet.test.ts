import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../../functions/planet/functions/saveTranslatePlanet';

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

test('should save planet', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_PLANETAS_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;
  const createPlanet = await handler(event, context);

  expect(createPlanet.statusCode).toEqual(201);
});

test('should response save planet to be Defined', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_PLANETAS_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;
  const createPlanet = await handler(event, context);
  expect(createPlanet).toBeDefined();
});
