import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllTodoQuery } from '../impl';
import { TodoService } from '../../todo.service';

@QueryHandler(GetAllTodoQuery)
export class GetAllTodoHandler implements IQueryHandler<GetAllTodoQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetAllTodoQuery): Promise<any> {
    return await this.todoService.getTodos();
  }
}
