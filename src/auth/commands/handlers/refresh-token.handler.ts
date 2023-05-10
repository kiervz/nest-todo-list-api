import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../impl';
import { GenerateTokenDto } from 'src/auth/dto/generate-token.dto';
import { AuthService } from 'src/auth/auth.service';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(private readonly authService: AuthService) {}

  async execute(command: RefreshTokenCommand): Promise<GenerateTokenDto> {
    return this.authService.refreshToken(command.refresh_token);
  }
}
