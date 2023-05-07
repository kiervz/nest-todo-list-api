import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl';
import { ProjectService } from '../../project.service';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: CreateProjectCommand): Promise<any> {
    const { createProjectDto } = command;
    return await this.projectService.createProject(createProjectDto);
  }
}
