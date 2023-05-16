import { SignInUserHandler } from './sign-in-user.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { SignOutUserHandler } from './sign-out-user.handler';
import { SignUpUserHandler } from './sign-up-user.handler';

export const CommandHandlers = [
  SignInUserHandler,
  RefreshTokenHandler,
  SignOutUserHandler,
  SignUpUserHandler,
];
