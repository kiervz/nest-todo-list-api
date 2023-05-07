import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetProjectQuery } from '../impl';
import { ProjectService } from '../../project.service';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: GetProjectQuery): Promise<any> {
    const { id } = query;
    return await this.projectService.getProjectById(id);
  }
}
