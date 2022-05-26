import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { formatJSONResponse } from '../../../common/utils/apiResponse';
import { httpGet } from '../../../common/utils/http';
import { translatePeople } from '../../../common/utils/translatePeople';
import { SWAPI_URL } from '../../../common/utils/consts';

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id ?? 1;

    const data = await httpGet(`${SWAPI_URL}/people/${id}`);
    console.log('[GET SWAPI PEOPLE]: ', data);

    if (!data) {
      return formatJSONResponse({ response: 'error al consultar la API' }, 500);
    }

    const persona = translatePeople(data);
    console.log('[Translate people]: ', persona);

    return formatJSONResponse(persona);
  } catch (err) {
    return formatJSONResponse({ response: 'error al traducir ' }, 500);
  }
};
