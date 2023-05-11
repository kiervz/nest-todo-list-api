import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoCommand } from '../impl';
import { UpdateResult } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: UpdateTodoCommand): Promise<UpdateResult> {
    return this.todoService.updateTodo(command.id, { ...command.dto });
  }
}
