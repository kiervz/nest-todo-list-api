import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInUserCommand } from './commands/impl';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUserQuery } from './queries/impl';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('login')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.commandBus.execute(new SignInUserCommand(signInUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return await this.queryBus.execute(new GetUserQuery(req.id));
  }
}
