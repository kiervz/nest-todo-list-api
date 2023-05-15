import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...CommandHandlers, ...QueryHandlers],
})
export class AuthModule {}
