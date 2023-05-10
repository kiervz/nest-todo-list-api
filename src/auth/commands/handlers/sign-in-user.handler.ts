import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInUserCommand } from '../impl';
import { GenerateTokenDto } from 'src/auth/dto/generate-token.dto';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute(command: SignInUserCommand): Promise<GenerateTokenDto> {
    return await this.authService.signIn(command.dto);
  }
}
