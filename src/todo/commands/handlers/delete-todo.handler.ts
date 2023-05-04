import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoCommand } from '../impl';
import { TodoService } from '../../todo.service';

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: DeleteTodoCommand): Promise<any> {
    const { id } = command;
    return await this.todoService.deleteTodo(id);
  }
}
