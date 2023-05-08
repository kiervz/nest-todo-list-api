import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<UpdateResult> {
    const todo = await this.todoRepository.findOneBy({ id: command.id });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return await this.todoRepository.update(
      { id: command.id },
      { ...command.dto },
    );
  }
}
