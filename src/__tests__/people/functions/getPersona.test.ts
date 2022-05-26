import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../../functions/people/functions/getPersona';
import { handler as handlerSavePeople } from '../../../functions/people/functions/saveTranslatePeople';

const mockDynamoDbGet = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify({
          nombre: 'Luke Skywalker',
          año_de_nacimiento: '19BBY',
          color_de_ojo: 'blue',
          genero: 'male',
          color_de_pelo: 'blond',
          altura: '172',
          masa: '77',
          color_de_piel: 'fair',
          mundo_natal: 'https://swapi.py4e.com/api/planets/1/',
          peliculas: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/2/',
            'https://swapi.py4e.com/api/films/3/',
            'https://swapi.py4e.com/api/films/6/',
            'https://swapi.py4e.com/api/films/7/',
          ],
          especies: ['https://swapi.py4e.com/api/species/1/'],
          naves_estelares: ['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/'],
          vehiculos: ['https://swapi.py4e.com/api/vehicles/14/', 'https://swapi.py4e.com/api/vehicles/30/'],
          url: 'https://swapi.py4e.com/api/people/1/',
          creado: '2014-12-09T13:50:51.644000Z',
          editado: '2014-12-20T21:17:56.891000Z',
          id: '1',
        }),
      });
    },
  };
});

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
        get: mockDynamoDbGet,
        put: mockDynamoDbPut,
      })),
    },
  };
});

test('should faild because not exist persona', async () => {
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;
  const response = await handler(event, context);
  expect(response.statusCode).toEqual(404);
});

test('should return persona', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_PERSONAS_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;

  await handlerSavePeople(event, context);

  const response = await handler(event, context);
  expect(response).toBeDefined();
});
