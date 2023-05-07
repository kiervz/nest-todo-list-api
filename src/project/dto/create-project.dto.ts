import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;
}
