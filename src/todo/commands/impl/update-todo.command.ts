import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

export class UpdateTodoCommand {
  constructor(public readonly id: number, public readonly dto: UpdateTodoDto) {}
}
