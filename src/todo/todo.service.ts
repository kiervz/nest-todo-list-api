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
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) throw new NotFoundException();

    return todo;
  }

  async createTodo(createTodo: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodo);

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
