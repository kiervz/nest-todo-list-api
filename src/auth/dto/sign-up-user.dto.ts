import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty({ message: 'The name field is required ' })
  name: string;

  @IsNotEmpty({ message: 'The email field is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'The password field is required' })
  @MinLength(6)
  password: string;
}
