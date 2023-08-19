import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/database/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from './user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user.
   *
   * @param {CreateUserDto} data - The data for creating the user.
   * @return {Promise<User>} The created user.
   */
  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  /**
   * Finds a user by id.
   *
   * @param {string} id - The id of the user to find.
   * @return {Promise<User>} A Promise that resolves to the user found.
   */
  async findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { AND: [{ id }, { deletedAt: null }] },
    });
  }

  /**
   * Finds a user by email.
   *
   * @param {string} email - The email of the user to find.
   * @return {Promise<User>} A promise that resolves to the user found.
   */
  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { AND: [{ email }, { deletedAt: null }] },
    });
  }

  /**
   * Updates a user with the provided ID.
   *
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} body - The data to update the user with.
   * @return {Promise<User>} - The updated user.
   */
  async update(id: string, body: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: body,
    });
  }

  /**
   * Deletes a user with the specified ID.
   *
   * @param {string} id - The ID of the user to delete.
   * @return {Promise<User>} A promise that resolves to the deleted user.
   */
  async delete(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
