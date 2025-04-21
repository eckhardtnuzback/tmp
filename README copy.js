import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "equipments";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}/{ename}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
              ename: event.pathParameters.ename,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}/{ename}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
              ename: event.pathParameters.ename,
            },
          })
        );
        body = body.Item;
        break;
      case "POST /items/{id}/{ename}":
        let requestJSON2 = JSON.parse(event.body);
        await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            UpdateExpression: "set price = :price, email = :email, #x = :date",
            ExpressionAttributeNames: {
              "#x": "date",
            },
            ExpressionAttributeValues: {
              ":price": requestJSON2.price,
              ":email": requestJSON2.email,
              ":date": requestJSON2.date,
            },
            ReturnValues: "ALL_NEW",
            Key: {
              id: event.pathParameters.id,
              ename: event.pathParameters.ename,
            },
          })
        );
        body = `POST item ${requestJSON2.id}`;
        break;
      case "GET /items":
        body = await dynamo.send(new ScanCommand({ TableName: tableName }));
        body = body.Items;
        break;
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              ename: requestJSON.ename,
              email: requestJSON.email,
              date: requestJSON.date,
            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
