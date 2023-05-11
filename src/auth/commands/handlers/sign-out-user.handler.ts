import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignOutUserCommand } from '../impl';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(SignOutUserCommand)
export class SignOutUserHandler implements ICommandHandler<SignOutUserCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: SignOutUserCommand): Promise<any> {
    return await this.authService.signOut(command.userId);
  }
}
