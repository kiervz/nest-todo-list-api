import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailVerificationCommand } from '../impl';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(EmailVerificationCommand)
export class EmailVerificationHandler
  implements ICommandHandler<EmailVerificationCommand>
{
  constructor(private readonly authService: AuthService) {}

  async execute(command: EmailVerificationCommand): Promise<any> {
    return await this.authService.emailVerification(command.email);
  }
}
