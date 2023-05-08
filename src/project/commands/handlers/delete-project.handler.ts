import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProjectCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler
  implements ICommandHandler<DeleteProjectCommand>
{
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<DeleteResult> {
    const project = await this.projectRepository.findOneBy({
      id: command.id,
    });

    if (!project) throw new NotFoundException('Project does not exist!');

    return this.projectRepository.delete(project.id);
  }
}
