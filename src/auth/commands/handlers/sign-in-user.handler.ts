import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateRefreshTokenDto } from 'src/auth/dto/update-refresh-token.dto';
import { GenerateTokenDto } from 'src/auth/dto/generate-token.dto';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: SignInUserCommand): Promise<GenerateTokenDto> {
    const user = await this.userRepository.findOneBy({
      email: command.dto.email,
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await this.compareData(command.dto.password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.updateRefreshToken(user.id, { refresh_token: refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateToken(user: User): Promise<GenerateTokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user.id },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        { sub: user.id },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(
    userId: number,
    token: UpdateRefreshTokenDto,
  ) {
    const hashedRefreshToken = await this.hashData(token.refresh_token);

    return this.userRepository.update(
      { id: userId },
      { refresh_token: hashedRefreshToken },
    );
  }

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  private async compareData(
    enteredData: string,
    dbData: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(enteredData, dbData);
    return match;
  }
}
