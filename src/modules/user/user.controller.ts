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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
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
  async remove(@Param('id') id: string, @Response() res: FastifyReply) {
    const response = await this.userService.delete(id);
    return sendResponse<string>(res, HttpStatus.OK, response);
  }
}
