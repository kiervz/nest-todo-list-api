import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoCommand } from '../impl';
import { DeleteResult } from 'typeorm';
import { TodoService } from 'src/todo/todo.service';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: DeleteTodoCommand): Promise<DeleteResult> {
    return this.todoService.deleteTodo(command.id);
  }
}
