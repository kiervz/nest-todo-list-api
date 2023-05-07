import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getTodos() {
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
      //   is_complete: true,
      //   created_at: true,
      //   updated_at: true,
      // },
    });
  }

  async getTodoById(id: number) {
    const todo = await this.todoRepository.findOne({
      where: {
        id,
      },
      relations: ['project'],
    });

    if (!todo) throw new NotFoundException();

    return todo;
  }

  async createTodo(createTodo: CreateTodoDto) {
    let project: Project;
    if (createTodo.project_id) {
      project = await this.projectRepository.findOneBy({
        id: createTodo.project_id,
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }
    }

    const todo = this.todoRepository.create({
      ...createTodo,
      project,
    });

    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, updateTodo: UpdateTodoDto) {
    return await this.todoRepository.update({ id }, { ...updateTodo });
  }

  async deleteTodo(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) throw new NotFoundException();

    return this.todoRepository.delete(id);
  }
}
