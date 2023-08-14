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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';
import { sendResponse } from '../../utils/response.utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Response() res: FastifyReply,
  ) {
    const response = await this.userService.create(createUserDto);

    return sendResponse(
      res,
      HttpStatus.CREATED,
      'Successfully retrieved all items',
      response,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res: FastifyReply) {
    const response = await this.userService.findOne(id);

    return sendResponse(
      res,
      HttpStatus.OK,
      'Successfully retrieved all items',
      response,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Response() res: FastifyReply,
  ) {
    try {
      const response = await this.userService.update(id, updateUserDto);

      return sendResponse(
        res,
        HttpStatus.OK,
        'Successfully retrieved all items',
        response,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Response() res: FastifyReply) {
    const response = await this.userService.remove(id);
    return sendResponse<string>(res, HttpStatus.OK, response);
  }
}
