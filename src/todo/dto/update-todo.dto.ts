import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsNotEmpty({ message: 'The due date field is required' })
  due_date: Date;

  @IsNotEmpty({ message: 'The is_complete field is required' })
  is_complete: boolean;
}
