import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse } from '../../../common/utils/apiResponse';
import { httpGet } from '../../../common/utils/http';
import { translatePlaneta } from '../utils/translatePlanet';
import { SWAPI_URL } from '../../../common/utils/consts';

const { SWAPI_PLANETAS_TABLE_NAME } = process.env;

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id ?? 1;

    const planeta = await httpGet(`${SWAPI_URL}/planets/${id}`);

    const planetaTranslated = translatePlaneta(planeta);

    try {
      planetaTranslated.id = id.toString();
      const docClient = new AWS.DynamoDB.DocumentClient();
      const response = await docClient
        .put({
          TableName: SWAPI_PLANETAS_TABLE_NAME || '',
          Item: planetaTranslated,
        })
        .promise();
      return formatJSONResponse(planetaTranslated, 201);
    } catch (e) {
      console.log('[ERROR]: ', e);
      return formatJSONResponse({ response: 'error al guardar en DynamoDB' }, 500);
    }
  } catch (err) {
    return formatJSONResponse({ response: 'error en la api SWAPI ' }, 500);
  }
};
