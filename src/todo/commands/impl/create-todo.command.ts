import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';

export class CreateTodoCommand {
  constructor(public readonly dto: CreateTodoDto) {}
}
