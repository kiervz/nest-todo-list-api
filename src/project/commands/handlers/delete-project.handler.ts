import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../impl';
import { DeleteResult } from 'typeorm';
import { ProjectService } from 'src/project/project.service';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(private readonly projectService: ProjectService) {}

  async execute(command: DeleteProjectCommand): Promise<DeleteResult> {
    return this.projectService.deleteProject(command.id);
  }
}
