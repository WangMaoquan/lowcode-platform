import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.projectService.findAll(req.user.id);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Request() req: any) {
    return this.projectService.findById(id, req.user.id);
  }

  @Post()
  async create(@Request() req: any, @Body() data: any) {
    return this.projectService.create(req.user.id, data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() data: any) {
    return this.projectService.update(id, req.user.id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.projectService.delete(id, req.user.id);
  }
}
