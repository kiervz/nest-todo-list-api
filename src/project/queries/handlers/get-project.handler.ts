import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProjectQuery } from '../impl';
import { Project } from 'src/entities/project';
import { ProjectService } from 'src/project/project.service';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: GetProjectQuery): Promise<Project> {
    return this.projectService.getProjectById(query.id);
  }
}
