import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from '../impl';
import { Todo } from 'src/entities/todo';
import { TodoService } from 'src/todo/todo.service';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodoQuery): Promise<Todo> {
    return this.todoService.getTodoById(query.id);
  }
}
