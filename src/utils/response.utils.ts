import { HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';

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
