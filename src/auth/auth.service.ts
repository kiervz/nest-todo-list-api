import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userRepository.findOneBy({
      email: signInUserDto.email,
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await this.compareData(
      signInUserDto.password,
      user.password,
    );

    if (!isMatch) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.updateRefreshToken(user.id, refreshToken);

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

  private async updateRefreshToken(userId: number, refresh_token: string) {
    const hashedRefreshToken = refresh_token
      ? await this.hashData(refresh_token)
      : null;

    return await this.userRepository.update(
      { id: userId },
      { refresh_token: hashedRefreshToken },
    );
  }

  async refreshToken(token: string): Promise<GenerateTokenDto> {
    const { sub: id } = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();

    const refreshTokenMatches = await this.compareData(
      token,
      user.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
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

  async signOut(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new UnauthorizedException();

    return this.updateRefreshToken(userId, null);
  }
}
