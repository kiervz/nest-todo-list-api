import { IsNotEmpty } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;
}
