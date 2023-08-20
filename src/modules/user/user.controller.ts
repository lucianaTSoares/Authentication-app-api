import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Response,
  Request,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Public } from '../../decorators/public.decorator';
import { sendResponse } from '../../utils/response.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import {
  CustomNotFoundResponse,
  CustomSuccessResponse,
  CustomUnauthorizedResponse,
  CustomUnprocessableResponse,
} from '../../decorators/swagger-response.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @CustomSuccessResponse({ operation: 'POST' })
  @CustomUnauthorizedResponse()
  @CustomUnprocessableResponse('User with this email already exists.')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Response() res: FastifyReply,
  ) {
    const response = await this.userService.create(createUserDto);

    return sendResponse(
      res,
      HttpStatus.CREATED,
      'User created successfully.',
      response,
    );
  }

  @Get(':id')
  @CustomSuccessResponse({ operation: 'GET' })
  @CustomNotFoundResponse('User not found.')
  @CustomUnauthorizedResponse()
  async findOne(@Param('id') id: string, @Response() res: FastifyReply) {
    const response = await this.userService.findOne(id);

    return sendResponse(
      res,
      HttpStatus.OK,
      'User found successfully.',
      response,
    );
  }

  @Patch()
  @CustomSuccessResponse({ operation: 'PATCH' })
  @CustomUnauthorizedResponse()
  async update(
    @Request() req: FastifyRequest & { user: User },
    @Body() updateUserDto: UpdateUserDto,
    @Response() res: FastifyReply,
  ) {
    try {
      const user = req.user;
      const response = await this.userService.update(user.id, updateUserDto);

      return sendResponse(
        res,
        HttpStatus.OK,
        'User updated successfully.',
        response,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  @CustomSuccessResponse({ optionalMessage: 'User removed successfully.' })
  async remove(@Param('id') id: string, @Response() res: FastifyReply) {
    const response = await this.userService.delete(id);
    return sendResponse<string>(res, HttpStatus.OK, response);
  }
}
