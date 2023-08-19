import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from './payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(
      password,
      (user && user.password) || '',
    );

    if (!user || !isPasswordValid) {
      throw new Error('Email ou senha incorretos.');
    }

    return {
      ...user,
      password: undefined,
    };
  }

  async signIn(user: User): Promise<{ access_token: string }> {
    const payload: AuthPayload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
