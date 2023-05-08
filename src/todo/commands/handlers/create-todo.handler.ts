import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { InsertResult, Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(command: CreateTodoCommand): Promise<InsertResult> {
    let project: Project;

    if (command.dto.project_id) {
      project = await this.projectRepository.findOneBy({
        id: command.dto.project_id,
      });

      if (!project) {
        throw new NotFoundException('Project does not exist!');
      }
    }

    const todo = new Todo();

    todo.name = command.dto.name;
    todo.due_date = command.dto.due_date;
    todo.project = project;

    return this.todoRepository.insert(todo);
  }
}
