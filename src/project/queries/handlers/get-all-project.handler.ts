import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllProjectQuery } from '../impl';
import { Project } from 'src/entities/project';
import { ProjectService } from 'src/project/project.service';

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: GetAllProjectQuery): Promise<Project[]> {
    return this.projectService.getAllProject();
  }
}
