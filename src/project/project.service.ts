import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private readonly cls: ClsService,
  ) {}

  async getAllProject(): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { user_id: this.cls.get('user').id },
    });
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({
      id,
      user_id: this.cls.get('user').id,
    });

    if (!project) throw new NotFoundException('Project does not exist!');

    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<InsertResult> {
    const isAlreadyExist = await this.projectRepository.findOneBy({
      user_id: this.cls.get('user').id,
      name: createProjectDto.name,
    });

    if (isAlreadyExist)
      throw new UnprocessableEntityException('Project is already exist!');

    const project = new Project();

    project.name = createProjectDto.name;
    project.user = this.cls.get('user');

    return this.projectRepository.insert(project);
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    const project = await this.projectRepository.findOneBy({
      id,
      user_id: this.cls.get('user').id,
    });

    if (!project) throw new NotFoundException('Project does not exist!');

    return await this.projectRepository.update(
      { id },
      { name: updateProjectDto.name },
    );
  }

  async deleteProject(id: number): Promise<DeleteResult> {
    const project = await this.projectRepository.findOneBy({
      id,
      user_id: this.cls.get('user').id,
    });

    if (!project) throw new NotFoundException('Project does not exist!');

    return this.projectRepository.delete(project.id);
  }
}
