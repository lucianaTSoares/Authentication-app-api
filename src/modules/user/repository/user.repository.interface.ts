import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../user.interface';

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  findOne(id: string): Promise<IUser>;
  findOneByEmail(email: string): Promise<IUser>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUser>;
  delete(id: string): Promise<IUser>;
}
