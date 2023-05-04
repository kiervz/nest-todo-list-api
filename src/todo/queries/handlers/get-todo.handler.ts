import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoService } from '../../todo.service';
import { GetTodoQuery } from '../impl';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodoQuery): Promise<any> {
    const { id } = query;
    return await this.todoService.getTodoById(id);
  }
}
