import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse } from '../../../common/utils/apiResponse';
import { httpGet } from '../../../common/utils/http';
import { translatePeople } from '../../../common/utils/translatePeople';
import { SWAPI_URL } from '../../../common/utils/consts';

const { SWAPI_TABLE_NAME } = process.env;

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id ?? 1;

    const people = await httpGet(`${SWAPI_URL}/people/${id}`);

    const persona = translatePeople(people);

    try {
      persona.id = id.toString();
      const docClient = new AWS.DynamoDB.DocumentClient();
      const response = await docClient
        .put({
          TableName: SWAPI_TABLE_NAME || '',
          Item: persona,
        })
        .promise();
      return formatJSONResponse(persona, 201);
    } catch (e) {
      console.log('[ERROR]: ', e);
      return formatJSONResponse({ response: 'error al guardar en DynamoDB' }, 500);
    }
  } catch (err) {
    return formatJSONResponse({ response: 'error en la api SWAPI ' }, 500);
  }
};
