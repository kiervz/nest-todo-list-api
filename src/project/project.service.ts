import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getAllProject(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project does not exist!');

    return project;
  }

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<InsertResult> {
    const project = new Project();

    project.name = createProjectDto.name;

    return this.projectRepository.insert(project);
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project does not exist!');

    return await this.projectRepository.update(
      { id },
      { name: updateProjectDto.name },
    );
  }

  async deleteProject(id: number): Promise<DeleteResult> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project does not exist!');

    return this.projectRepository.delete(project.id);
  }
}
