import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllProjectQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async execute(query: GetAllProjectQuery): Promise<Project[]> {
    return await this.projectRepository.find();
  }
}
