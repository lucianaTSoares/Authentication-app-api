import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Authentication API')
  .setDescription('An API with user registration and authentication.')
  .setVersion('1.0')
  .build();
