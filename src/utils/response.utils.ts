import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';

export function sendResponse<T>(
  res: FastifyReply,
  statusCode: HttpStatus,
  message: string,
  data?: T,
) {
  return res.code(statusCode).send({
    message,
    data,
    statusCode,
  });
}
