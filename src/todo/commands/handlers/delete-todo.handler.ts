import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<DeleteResult> {
    const todo = await this.todoRepository.findOneBy({ id: command.id });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return this.todoRepository.delete(todo.id);
  }
}
