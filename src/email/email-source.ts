import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
dotenv.config();

export const emailSourceOptions: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  },
  defaults: {
    from: process.env.MAIL_NOREPLY,
  },
  template: {
    dir: 'src/email/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
