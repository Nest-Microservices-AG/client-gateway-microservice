import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { AuthGuard } from './guards/auth.guard';

import { NATS_SERVICE } from '../config';

import { Token, User } from './decorators';

import { SigninUserDto, SignupUserDto } from './dto';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('signup')
  signupUser(@Body() signupUserDto: SignupUserDto) {
    return this.client.send('auth.signup.user', signupUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('signin')
  signinUser(@Body() signinUserDto: SigninUserDto) {
    return this.client.send('auth.signin.user', signinUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token };
  }
}
