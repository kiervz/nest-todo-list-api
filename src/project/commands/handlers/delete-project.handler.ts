import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../impl';
import { ProjectService } from '../../project.service';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: DeleteProjectCommand): Promise<any> {
    const { id } = command;
    return await this.projectService.deleteProject(id);
  }
}
