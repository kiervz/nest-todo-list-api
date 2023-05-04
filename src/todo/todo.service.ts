import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async getTodos() {
    return await this.todoRepository.find();
  }

  async getTodoById(id: number) {
    return await this.todoRepository.find({
      where: {
        id,
      },
    });
  }

  async createTodo(createTodo: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodo);

    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, updateTodo: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException();
    }

    Object.assign(todo, updateTodo);
    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException();
    }

    return this.todoRepository.delete(id);
  }
}
