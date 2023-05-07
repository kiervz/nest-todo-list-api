import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '../impl';
import { ProjectService } from '../../project.service';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: UpdateProjectCommand): Promise<any> {
    const { id, updateProjectDto } = command;
    return await this.projectService.updateProject(id, updateProjectDto);
  }
}
