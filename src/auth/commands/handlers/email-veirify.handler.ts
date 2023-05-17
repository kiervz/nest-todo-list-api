import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailVerifyCommand } from '../impl';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(EmailVerifyCommand)
export class EmailVerifyHandler implements ICommandHandler<EmailVerifyCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: EmailVerifyCommand): Promise<any> {
    return await this.authService.emailVerifyToken(command.dto);
  }
}
