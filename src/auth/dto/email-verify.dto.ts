import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerifyDto {
  @IsNotEmpty({ message: 'The token field is required ' })
  token: number;

  @IsNotEmpty({ message: 'The email field is required' })
  @IsEmail()
  email: string;
}
