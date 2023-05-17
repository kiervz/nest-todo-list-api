import { EmailVerifyDto } from 'src/auth/dto/email-verify.dto';

export class EmailVerifyCommand {
  constructor(public readonly dto: EmailVerifyDto) {}
}
