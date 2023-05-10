import { IsString } from 'class-validator';

export class UpdateRefreshTokenDto {
  @IsString()
  refresh_token: string | null;
}
