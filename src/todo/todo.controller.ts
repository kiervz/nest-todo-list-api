import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodoQuery, GetTodosQuery } from './queries/impl';
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from './commands/impl';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async get() {
    return await this.queryBus.execute(new GetTodosQuery());
  }

  @Get('/:id')
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetTodoQuery(id));
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.commandBus.execute(new CreateTodoCommand(createTodoDto));
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.commandBus.execute(
      new UpdateTodoCommand(id, updateTodoDto),
    );
  }

  @Delete('/:id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
