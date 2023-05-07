import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateProjectCommand,
  DeleteProjectCommand,
  UpdateProjectCommand,
} from './commands/impl';
import { GetAllProjectQuery, GetProjectQuery } from './queries/impl';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getProjects() {
    return await this.queryBus.execute(new GetAllProjectQuery());
  }

  @Get('/:id')
  async getProjectById(@Param('id', ParseIntPipe) id: number) {
    const query = new GetProjectQuery(id);
    return await this.queryBus.execute(query);
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    const command = new CreateProjectCommand(createProjectDto);
    return await this.commandBus.execute(command);
  }

  @Patch('/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const command = new UpdateProjectCommand(id, updateProjectDto);
    return await this.commandBus.execute(command);
  }

  @Delete('/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    const command = new DeleteProjectCommand(id);
    return await this.commandBus.execute(command);
  }
}
