import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk';
import { formatJSONResponse } from '../../../common/utils/apiResponse';

const { SWAPI_TABLE_NAME } = process.env;

export const handler = async (event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id ?? 1;

    const docClient = new AWS.DynamoDB.DocumentClient();
    const response = await docClient
      .get({
        TableName: SWAPI_TABLE_NAME || '',
        Key: {
          id: id.toString(),
        },
      })
      .promise();
    console.log('Get persona: ', response);
    if (!response.Item) {
      return formatJSONResponse({ response: 'no se encuentra en DynamoDB' }, 404);
    }
    return formatJSONResponse(response.Item);
  } catch {
    return formatJSONResponse({ response: 'error en la api' }, 500);
  }
};
