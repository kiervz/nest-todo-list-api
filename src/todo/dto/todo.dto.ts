import { Todo } from 'src/entities/todo';
import { ProjectDto } from 'src/project/dto/project.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { TodoStatus } from 'src/utils';

export class TodoDto {
  id: number;
  name: string;
  status: TodoStatus;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: UserDto;
  project_id: number;
  project: ProjectDto;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.name = todo.name;
    this.status = todo.status;
    this.due_date = todo.due_date;
    this.created_at = todo.created_at;
    this.updated_at = todo.updated_at;
    this.user = {
      id: todo.user.id,
      name: todo.user.name,
      email: todo.user.email,
      verified_at: todo.user.verified_at,
    };
    if (todo.project) {
      this.project = {
        id: todo.project.id,
        user_id: todo.project.user_id,
        name: todo.project.name,
      };
    }
  }
}
