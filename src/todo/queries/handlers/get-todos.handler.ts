import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../impl';
import { Todo } from 'src/entities/todo';
import { TodoService } from 'src/todo/todo.service';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }
}
