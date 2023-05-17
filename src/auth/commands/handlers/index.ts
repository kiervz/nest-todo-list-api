import { SignInUserHandler } from './sign-in-user.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { SignOutUserHandler } from './sign-out-user.handler';
import { SignUpUserHandler } from './sign-up-user.handler';
import { EmailVerifyHandler } from './email-veirify.handler';
import { EmailVerificationHandler } from './email-veirification.handler';

export const CommandHandlers = [
  SignInUserHandler,
  RefreshTokenHandler,
  SignOutUserHandler,
  SignUpUserHandler,
  EmailVerifyHandler,
  EmailVerificationHandler,
];
