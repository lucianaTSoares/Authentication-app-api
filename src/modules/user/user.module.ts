import { Module } from '@nestjs/common';
import { PrismaModule } from '../../config/database/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PrismaModule],
  exports: [UserService, UserRepository],
})
export class UserModule {}
