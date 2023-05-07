import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllProjectQuery } from '../impl';
import { ProjectService } from '../../project.service';

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
  constructor(private readonly projectService: ProjectService) {}

  async execute(query: GetAllProjectQuery): Promise<any> {
    return await this.projectService.getProjects();
  }
}
