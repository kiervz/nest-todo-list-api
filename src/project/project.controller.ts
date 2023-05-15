import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
    return await this.queryBus.execute(new GetProjectQuery(id));
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.commandBus.execute(
      new CreateProjectCommand(createProjectDto),
    );
  }

  @Patch('/:id')
  async updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.commandBus.execute(
      new UpdateProjectCommand(id, updateProjectDto),
    );
  }

  @Delete('/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteProjectCommand(id));
  }
}
