import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
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
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const query = new GetTodoQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    const command = new CreateTodoCommand(createTodoDto);
    return await this.commandBus.execute(command);
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const command = new UpdateTodoCommand(id, updateTodoDto);
    return await this.commandBus.execute(command);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteTodoCommand(id);
    return await this.commandBus.execute(command);
  }
}
