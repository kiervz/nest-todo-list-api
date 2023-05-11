import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl';
import { InsertResult } from 'typeorm';
import { ProjectService } from 'src/project/project.service';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: CreateProjectCommand): Promise<InsertResult> {
    return this.projectService.createProject({ ...command.dto });
  }
}
