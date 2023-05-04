import { CreateTodoHandler } from './create-todo.handler';
import { UpdateTodoHandler } from './update-todo.handler';
import { DeleteTodoHandler } from './delete-todo.handler';

export const CommandHandlers = [
  CreateTodoHandler,
  UpdateTodoHandler,
  DeleteTodoHandler,
];
