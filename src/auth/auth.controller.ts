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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  EmailVerifyCommand,
  RefreshTokenCommand,
  SignInUserCommand,
  SignOutUserCommand,
  SignUpUserCommand,
} from './commands/impl';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUserByIdQuery } from './queries/impl';
import {
  RefreshTokenDto,
  SignInUserDto,
  SignUpUserDto,
  EmailVerifyDto,
} from './dto';

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

  @Post('register')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return await this.commandBus.execute(new SignUpUserCommand(signUpUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return await this.queryBus.execute(new GetUserByIdQuery(req.user.id));
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
    return this.commandBus.execute(new SignOutUserCommand(req.user.id));
  }

  @Post('email/verify')
  async emailVerifyToken(@Body() emailVerifyDto: EmailVerifyDto) {
    return this.commandBus.execute(new EmailVerifyCommand(emailVerifyDto));
  }
}
