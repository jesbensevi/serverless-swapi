import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handler } from '../../../functions/planet/functions/getPlaneta';
import { handler as handlerSavePlanet } from '../../../functions/planet/functions/saveTranslatePlanet';

const mockDynamoDbGet = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify({
          periodo_de_rotacion: '23',
          nombre: 'Tatooine',
          diámetro: '10465',
          agua_superficial: '1',
          periodo_de_orbitacion: '304',
          clima: 'arid',
          residentes: [
            'https://swapi.py4e.com/api/people/1/',
            'https://swapi.py4e.com/api/people/2/',
            'https://swapi.py4e.com/api/people/4/',
            'https://swapi.py4e.com/api/people/6/',
            'https://swapi.py4e.com/api/people/7/',
            'https://swapi.py4e.com/api/people/8/',
            'https://swapi.py4e.com/api/people/9/',
            'https://swapi.py4e.com/api/people/11/',
            'https://swapi.py4e.com/api/people/43/',
            'https://swapi.py4e.com/api/people/62/',
          ],
          url: 'https://swapi.py4e.com/api/planets/1/',
          población: '200000',
          peliculas: [
            'https://swapi.py4e.com/api/films/1/',
            'https://swapi.py4e.com/api/films/3/',
            'https://swapi.py4e.com/api/films/4/',
            'https://swapi.py4e.com/api/films/5/',
            'https://swapi.py4e.com/api/films/6/',
          ],
          editado: '2014-12-20T20:58:18.411000Z',
          gravedad: '1 standard',
          creado: '2014-12-09T13:50:49.641000Z',
          id: '1',
          terreno: 'desert',
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

test('should faild because not exist planet', async () => {
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

test('should return planet', async () => {
  process.env.AWS_REGION = 'us-east-1';
  process.env.SWAPI_PLANETAS_TABLE_NAME = 'swapi-register-dev';
  const event: APIGatewayProxyEvent = {
    ...(<any>{}),
    pathParameters: {
      id: '1',
    },
  };
  const context = {} as Context;

  await handlerSavePlanet(event, context);

  const response = await handler(event, context);
  expect(response).toBeDefined();
});
