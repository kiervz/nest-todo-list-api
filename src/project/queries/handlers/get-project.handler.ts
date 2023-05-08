import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProjectQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(query: GetProjectQuery): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id: query.id });

    if (!project) throw new NotFoundException('Project does not exist!');

    return project;
  }
}
