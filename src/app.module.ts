import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { MailerModule } from '@nestjs-modules/mailer';
import { emailSourceOptions } from './email/email-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.prod'],
    }),
    // Register the ClsModule and automatically mount the ClsMiddleware
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    MailerModule.forRoot(emailSourceOptions),
    TypeOrmModule.forRoot(dataSourceOptions),
    TodoModule,
    ProjectModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
