import { UpdateProjectDto } from '../../dto/update-project.dto';

export class UpdateProjectCommand {
  constructor(
    public readonly id: number,
    public readonly updateProjectDto: UpdateProjectDto,
  ) {}
}
