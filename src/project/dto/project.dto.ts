import { Project } from 'src/entities/project';

export class ProjectDto {
  id: number;
  name: string;
  user_id: number;

  constructor(project: Project) {
    this.id = project.id;
    this.user_id = project.user_id;
    this.name = project.name;
  }
}
