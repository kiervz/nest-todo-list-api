import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, Project]), CqrsModule],
  controllers: [TodoController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class TodoModule {}
