import { SignUpUserDto } from 'src/auth/dto/sign-up-user.dto';

export class SignUpUserCommand {
  constructor(public readonly dto: SignUpUserDto) {}
}
