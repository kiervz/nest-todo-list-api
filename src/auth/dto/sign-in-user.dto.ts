import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({ message: 'The email field is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'The password field is required' })
  @MinLength(6)
  password: string;
}
