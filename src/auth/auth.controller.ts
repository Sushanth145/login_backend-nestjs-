/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';  // <-- import Request here
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

interface JwtUser {
  userId: number;
  username: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user as JwtUser;  // cast req.user to JwtUser interface
  }
}
