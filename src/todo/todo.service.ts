import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/entities/project';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private readonly projectService: ProjectService,
  ) {}

  async getAllTodo(): Promise<Todo[]> {
    return await this.todoRepository.find({
      relations: ['project'],
      // select: {
      //   id: true,
      //   name: true,
      //   status: true,
      //   project: {
      //     id: true,
      //     name: true,
      //   },
      //   due_date: true,
      //   created_at: true,
      //   updated_at: true,
      // },
    });
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return todo;
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
    todo.project = project;

    return await this.todoRepository.insert(todo);
  }

  async updateTodo(
    id: number,
    upteTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    const todo = await this.todoRepository.findOneBy({ id });

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
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) throw new NotFoundException('Todo does not exist!');

    return this.todoRepository.delete(todo.id);
  }
}
