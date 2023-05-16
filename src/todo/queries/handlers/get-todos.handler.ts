import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../impl';
import { TodoService } from 'src/todo/todo.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { TodoDto } from 'src/todo/dto/todo.dto';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(private readonly todoService: TodoService) {}

  async execute(query: GetTodosQuery): Promise<Pagination<TodoDto>> {
    const { req } = query;

    const options: IPaginationOptions = {
      page: req.query.hasOwnProperty('page') ? +req.query.page : 1,
      limit: req.query.hasOwnProperty('limit') ? +req.query.limit : 10,
    };

    return this.todoService.getAllTodo(options);
  }
}
