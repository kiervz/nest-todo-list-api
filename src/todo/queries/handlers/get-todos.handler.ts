import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodosQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo';
import { Repository } from 'typeorm';

@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async execute(query: GetTodosQuery): Promise<Todo[]> {
    return await this.todoRepository.find({
      relations: ['project'],
      // select: {
      //   id: true,
      //   name: true,
      //   status: true,
      //   project: {
      //     id: true,
      //     name: true,
      //   },
      //   due_date: true,
      //   is_complete: true,
      //   created_at: true,
      //   updated_at: true,
      // },
    });
  }
}
