import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async getProjects() {
    return await this.projectRepository.find();
  }

  async getProjectById(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException();

    return project;
  }

  async createProject(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto);

    return await this.projectRepository.save(project);
  }

  async updateProject(id: number, updateProject: UpdateProjectDto) {
    return await this.projectRepository.update({ id }, { ...updateProject });
  }

  async deleteProject(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException();

    return this.projectRepository.delete(id);
  }
}
