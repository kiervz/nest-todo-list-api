import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '../impl';
import { UpdateResult } from 'typeorm';
import { ProjectService } from 'src/project/project.service';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: UpdateProjectCommand): Promise<UpdateResult> {
    return this.projectService.updateProject(command.id, { ...command.dto });
  }
}
