import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { Todo } from '../entities/todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { Project } from 'src/entities/project';
import { TodoService } from './todo.service';
import { ProjectService } from 'src/project/project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Project]), CqrsModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    ProjectService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class TodoModule {}
