import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UpdateUserDto } from '../modules/user/dto/update-user.dto';

export const CustomUnprocessableResponse = (message: string) => {
  return ApiUnprocessableEntityResponse({
    schema: {
      properties: {
        message: { example: message },
        error: { example: 'Unprocessable Entity' },
        statusCode: { example: 422 },
      },
    },
  });
};

export const CustomSuccessResponse = ({
  operation,
  optionalMessage,
}: {
  operation?: 'GET' | 'POST' | 'PATCH';
  optionalMessage?: string;
}) => {
  const statusCode = operation === 'POST' ? 201 : 200;
  const message =
    operation === 'POST'
      ? 'User created successfully'
      : operation === 'GET'
      ? 'User found successfully'
      : 'User updated successfully';

  const schema = {
    properties: {
      message: {
        example: optionalMessage || message,
        type: 'string',
      },
      ...(operation
        ? {
            data: {
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
              },
              oneOf: [{ $ref: getSchemaPath(UpdateUserDto) }],
            },
          }
        : null),
      statusCode: { example: statusCode, type: 'number' },
    },
  };

  if (statusCode === 201) {
    return ApiCreatedResponse({
      schema,
    });
  } else {
    return ApiOkResponse({
      schema,
    });
  }
};

export const CustomUnauthorizedResponse = (
  message?: string,
  hasError?: boolean,
) => {
  return ApiUnauthorizedResponse({
    schema: {
      properties: {
        ...(message
          ? { message: { example: message, type: 'string' } }
          : { message: { example: 'Unauthorized', type: 'string' } }),
        ...(hasError
          ? { error: { example: 'Unauthorized', type: 'string' } }
          : null),
        statusCode: { example: 401, type: 'number' },
      },
    },
  });
};

export const CustomNotFoundResponse = (message: string) => {
  return ApiNotFoundResponse({
    schema: {
      properties: {
        message: { example: message, type: 'string' },
        error: { example: 'Not Found', type: 'string' },
        statusCode: { example: 404, type: 'number' },
      },
    },
  });
};
