import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), CqrsModule],
  controllers: [TodoController],
  providers: [TodoService, ...CommandHandlers, ...QueryHandlers],
})
export class TodoModule {}
