import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { UserVerification } from 'src/entities/user-verification';
import { InsertResult, Repository } from 'typeorm';
import { GenerateTokenDto, SignInUserDto, SignUpUserDto } from './dto';
import { ClsService } from 'nestjs-cls';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDto } from 'src/user/dto/user.dto';
import {
  VerificationType,
  compareData,
  generateRandomNumber,
  hashData,
} from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserVerification)
    private userVerificationRepository: Repository<UserVerification>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cls: ClsService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userRepository.findOneBy({
      email: signInUserDto.email,
    });

    if (!user) throw new UnauthorizedException();

    const isMatch = await compareData(signInUserDto.password, user.password);

    this.cls.set('user', user);

    if (!isMatch) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<InsertResult> {
    const isEmailExist = await this.userRepository.findOne({
      where: { email: signUpUserDto.email },
      select: { email: true },
    });

    if (isEmailExist)
      throw new UnprocessableEntityException('Email already exist!');

    const user = new User();
    user.name = signUpUserDto.name;
    user.email = signUpUserDto.email;
    user.password = await hashData(signUpUserDto.password);

    await this.sendEmailVerification(user);

    return this.userRepository.insert(user);
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
      ? await hashData(refresh_token)
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

    const refreshTokenMatches = await compareData(token, user.refresh_token);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async sendEmailVerification(user: UserDto) {
    const expirationTime = new Date(Date.now() + 60 * 60 * 1000);

    const userVerification = await this.userVerificationRepository.save({
      email: user.email,
      verification_code: generateRandomNumber(6),
      type: VerificationType.REGISTER,
      expired_at: expirationTime,
    });

    this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Email Verification - ToDo List ✔',
        template: './email-verification',
        context: {
          username: user.name,
          code: userVerification.verification_code,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });

    return user;
  }

  async signOut(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) throw new UnauthorizedException();

    return this.updateRefreshToken(userId, null);
  }
}
