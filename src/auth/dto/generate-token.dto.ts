import { IsString } from 'class-validator';

export class GenerateTokenDto {
  @IsString()
  accessToken: string | null;

  @IsString()
  refreshToken: string | null;
}
