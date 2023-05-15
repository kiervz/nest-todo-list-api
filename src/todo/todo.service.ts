import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/entities/project';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { TodosDto } from './dto/todos.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @Inject(ProjectService) private readonly projectService: ProjectService,
    private readonly cls: ClsService,
  ) {}

  async getAllTodo(): Promise<TodosDto> {
    const todos = await this.todoRepository.find({
      where: { user_id: this.cls.get('user').id },
      relations: ['user', 'project'],
    });

    return new TodosDto(todos);
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user_id: this.cls.get('user').id },
      relations: ['user', 'project'],
    });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return new TodoDto(todo);
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    let project: Project;

    if (createTodoDto.project_id) {
      project = await this.projectService.getProjectById(
        createTodoDto.project_id,
      );
    }

    const todo = new Todo();

    todo.name = createTodoDto.name;
    todo.due_date = createTodoDto.due_date;
    todo.user = this.cls.get('user');
    todo.project = project;

    return await this.todoRepository.insert(todo);
  }

  async updateTodo(
    id: number,
    upteTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    const todo = await this.todoRepository.findOneBy({
      id,
      user_id: this.cls.get('user').id,
    });

    let project: Project;

    if (upteTodoDto.project_id) {
      project = await this.projectService.getProjectById(
        upteTodoDto.project_id,
      );

      if (!project) {
        throw new NotFoundException('Project does not exist!');
      }
    }

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return await this.todoRepository.update({ id }, { ...upteTodoDto });
  }

  async deleteTodo(id: number): Promise<DeleteResult> {
    const todo = await this.todoRepository.findOneBy({
      id,
      user_id: this.cls.get('user').id,
    });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return this.todoRepository.delete(todo.id);
  }
}
