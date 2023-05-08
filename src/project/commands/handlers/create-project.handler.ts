import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { InsertResult, Repository } from 'typeorm';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(command: CreateProjectCommand): Promise<InsertResult> {
    const project = new Project();

    project.name = command.dto.name;

    return await this.projectRepository.insert(project);
  }
}
