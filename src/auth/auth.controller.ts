import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  RefreshTokenCommand,
  SignInUserCommand,
  SignOutUserCommand,
} from './commands/impl';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUserQuery } from './queries/impl';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
    try {
      return await this.commandBus.execute(
        new RefreshTokenCommand(refresh_token),
      );
    } catch (err) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Request() req) {
    return this.commandBus.execute(new SignOutUserCommand(req.user.userId));
  }
}
