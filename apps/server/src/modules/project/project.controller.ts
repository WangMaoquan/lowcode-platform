import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { RequireLogin } from 'src/common/decorator/requireLogin.decorator'

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @RequireLogin()
  async findAll(@Request() req: { user: { id: string } }) {
    return this.projectService.findAll(req.user.id)
  }

  @Get(':id')
  @RequireLogin()
  async findById(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.projectService.findById(id, req.user.id)
  }

  @Post()
  @RequireLogin()
  async create(@Request() req: { user: { id: string } }, @Body() data: CreateProjectDto) {
    return this.projectService.create(req.user.id, data)
  }

  @Put(':id')
  @RequireLogin()
  async update(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
    @Body() data: UpdateProjectDto
  ) {
    return this.projectService.update(id, req.user.id, data)
  }

  @Delete(':id')
  @RequireLogin()
  async delete(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.projectService.delete(id, req.user.id)
  }
}
