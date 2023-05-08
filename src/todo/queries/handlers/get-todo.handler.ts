import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTodoQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetTodoQuery)
export class GetTodoHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async execute(query: GetTodoQuery): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: query.id,
      },
      relations: ['project'],
    });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return todo;
  }
}
