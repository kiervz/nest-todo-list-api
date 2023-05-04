import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../impl';
import { TodoService } from '../../todo.service';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: CreateTodoCommand): Promise<any> {
    const { name, due_date } = command;
    return await this.todoService.createTodo({ name, due_date });
  }
}
