import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../impl';
import { TodoService } from 'src/todo/todo.service';
import { TodosDto } from 'src/todo/dto/todos.dto';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodosQuery): Promise<TodosDto> {
    return this.todoService.getAllTodo();
  }
}
