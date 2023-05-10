import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SignInUserCommand } from './commands/impl';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.commandBus.execute(new SignInUserCommand(signInUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
