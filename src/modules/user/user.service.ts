/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<IUser, 'password'>> {
    const isEmailTaken = await this.userRepository.findOneByEmail(
      createUserDto.email,
    );

    if (isEmailTaken) {
      throw new UnprocessableEntityException('Email already exists.');
    }

    const userWithCryptedPassword = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const { password, ...createdUser } = await this.userRepository.create(
      userWithCryptedPassword,
    );

    if (!createdUser) {
      throw new InternalServerErrorException('Error creating user.');
    }

    return createdUser;
  }

  async findOne(id: string): Promise<Omit<IUser, 'password'>> {
    const userExists = await this.userRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const { password, ...userWithoutPassword } = userExists;

    return userWithoutPassword;
  }

  async update(
    id: string,
    body: UpdateUserDto,
  ): Promise<Omit<IUser, 'password'>> {
    const userExists = await this.userRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const userWithCryptedPassword = {
      ...UpdateUserDto,
      password: await bcrypt.hash(userExists.password, 10),
    };

    const { password, ...userUpdated } = await this.userRepository.update(
      id,
      userWithCryptedPassword,
    );

    if (!userUpdated) {
      throw new InternalServerErrorException('Error updating user.');
    }

    return userUpdated;
  }

  async remove(id: string): Promise<string> {
    const userExists = await this.userRepository.findOne(id);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    const userRemoved = await this.userRepository.delete(id);

    if (!userRemoved) {
      throw new InternalServerErrorException('Error removing user.');
    }

    return 'User removed successfully.';
  }
}
