# Serverless, Typescript, DynamoDB

## Deploy

_Para hacer el deploy del servicion en dev, basta con ejecutar el siguiente comando:_

```bash
npm run deploy:dev
```

_Con esto se hace el deploy de 6 endpoints que nos permite guardar y mostrar información de People y Planet traducida_

```bash
  GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/people/{id}
  POST - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/people/{id}
  GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/persona/{id}
  GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/personas
  POST - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/planet/{id}
  GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/planeta/{id}
```

## Test

_Para correr los test basta con ejecutar el siguiente comando_

```bash
npm run test
```

### Endpoints

#### GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/people/{id}

_Obtiene la información de una persona desde la api de SWAPI y la traduce_

#### POST - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/people/{id}

_Guarda la información de una persona traducida en DynamoDB_

#### GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/persona/{id}

_Obtiene la información de una persona ya traducida desde DynamoDB_

#### GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/personas

_Obtiene todas las personas desde DynamoDB_

#### POST - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/planet/{id}

_Guarda la información de un planeta traducido en DynamoDB_

#### GET - https://2qnezr8md6.execute-api.us-east-1.amazonaws.com/dev/swapi/planeta/{id}

_Obtiene la información de un planeta ya traducida desde DynamoDB_
