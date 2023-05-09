import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProjectCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<UpdateResult> {
    const project = await this.projectRepository.findOneBy({
      id: command.id,
    });

    if (!project) throw new NotFoundException('Project does not exist!');

    return await this.projectRepository.update(
      { id: command.id },
      { name: command.dto.name },
    );
  }
}
