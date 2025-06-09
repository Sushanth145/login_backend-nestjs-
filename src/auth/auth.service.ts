/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(username, hashedPassword);
    return { id: user.id, username: user.username };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) return null;
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
