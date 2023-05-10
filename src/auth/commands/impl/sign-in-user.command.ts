import { SignInUserDto } from 'src/auth/dto/sign-in-user.dto';

export class SignInUserCommand {
  constructor(public readonly dto: SignInUserDto) {}
}
