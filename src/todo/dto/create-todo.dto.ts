import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsNotEmpty({ message: 'The due date field is required' })
  due_date: Date;

  project_id: number;
}
