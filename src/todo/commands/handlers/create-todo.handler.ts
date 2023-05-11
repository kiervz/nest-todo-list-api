import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../impl';
import { InsertResult } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: CreateTodoCommand): Promise<InsertResult> {
    return this.todoService.createTodo({ ...command.dto });
  }
}
