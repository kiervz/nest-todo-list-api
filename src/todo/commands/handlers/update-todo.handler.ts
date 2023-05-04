import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoCommand } from '../impl';
import { TodoService } from '../../todo.service';

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(private readonly todoService: TodoService) {}

  async execute(command: UpdateTodoCommand): Promise<any> {
    const { id, updateTodoDto } = command;
    return await this.todoService.updateTodo(id, updateTodoDto);
  }
}
