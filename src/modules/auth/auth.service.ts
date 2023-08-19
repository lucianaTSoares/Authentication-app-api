import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthPayload } from './payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user's email and password.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @return {Promise<User>} - The validated user object.
   */
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

  /**
   * Signs in a user and returns an access token.
   *
   * @param {User} user - The user object containing the user's ID and email.
   * @return {Promise<{ access_token: string }>} - A promise that resolves to an object containing the access token.
   */
  async signIn(user: User): Promise<{ access_token: string }> {
    const payload: AuthPayload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
