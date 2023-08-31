import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../config/database/prisma/prisma.module';
import { FastifyReply } from 'fastify';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let res: FastifyReply;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
      imports: [PrismaModule],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);

    res = {
      code: jest.fn(() => res),
      send: jest.fn(),
    } as unknown as FastifyReply;
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const id: string = uuidv4();
      const result = {
        id: id,
        email: 'test@test.com',
        name: 'Tester',
        photo: 'https://test.com',
        bio: 'A bio about test',
        phone: '11999999999',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };

      jest.spyOn(userService, 'findOne').mockResolvedValue(result);
      await userController.findOne(id, res);

      expect(res.code).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: HttpStatus.OK,
        message: 'User found successfully.',
        data: result,
      });
    });
  });
});
