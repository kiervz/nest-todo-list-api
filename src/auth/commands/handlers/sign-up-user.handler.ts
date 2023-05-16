import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../impl';
import { AuthService } from 'src/auth/auth.service';
import { InsertResult } from 'typeorm';

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: SignUpUserCommand): Promise<InsertResult> {
    return await this.authService.signUp(command.dto);
  }
}
