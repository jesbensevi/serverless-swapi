import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse } from '../../../common/utils/apiResponse';

const { SWAPI_TABLE_NAME } = process.env;

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const response = await docClient
      .scan({
        TableName: SWAPI_TABLE_NAME || '',
      })
      .promise();

    if (!response.Items) {
      return formatJSONResponse({ response: 'no hay datos en DynamoDB' }, 404);
    }

    return formatJSONResponse(response.Items);
  } catch (e) {
    console.log('[ERROR]: ', e);
    return formatJSONResponse({ response: 'error en la api' }, 500);
  }
};
