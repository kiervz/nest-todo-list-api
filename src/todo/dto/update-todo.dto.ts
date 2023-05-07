import { IsEnum, IsNotEmpty } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class UpdateTodoDto {
  @IsNotEmpty({ message: 'The name field is required' })
  name: string;

  @IsNotEmpty({ message: 'The due date field is required' })
  due_date: Date;

  @IsNotEmpty({ message: 'The status field is required' })
  @IsEnum(TodoStatus, {
    message: 'Status must be one of: ' + Object.values(TodoStatus).join(', '),
  })
  status: TodoStatus;
}
