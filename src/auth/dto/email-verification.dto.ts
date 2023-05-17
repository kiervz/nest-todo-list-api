import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty({ message: 'The email field is required' })
  @IsEmail()
  email: string;
}
