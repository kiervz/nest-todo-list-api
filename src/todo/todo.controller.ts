import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodoQuery, GetAllTodoQuery } from './queries/impl';
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from './commands/impl';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get() {
    return await this.queryBus.execute(new GetAllTodoQuery());
  }

  @Get('/:id')
  async getTodo(@Param('id') id) {
    const query = new GetTodoQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    const command = new CreateTodoCommand(
      createTodoDto.name,
      createTodoDto.due_date,
    );

    return await this.commandBus.execute(command);
  }

  @Patch('/:id')
  async updateTodo(@Param('id') id, @Body() updateTodoDto: UpdateTodoDto) {
    const command = new UpdateTodoCommand(id, updateTodoDto);
    return await this.commandBus.execute(command);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id) {
    const command = new DeleteTodoCommand(id);
    return this.commandBus.execute(command);
  }
}
