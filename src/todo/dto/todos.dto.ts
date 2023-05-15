import { TodoDto } from './todo.dto';

export class TodosDto {
  constructor(todos: TodoDto[]) {
    this.data = todos.map((todo) => new TodoDto(todo));
  }

  data: TodoDto[];
}
