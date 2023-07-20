import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { ProfessorService } from './professor.service';
import { Professor } from './professor.entity';

@Controller('api/professor')
export class ProfessorController {
    constructor(private userService: UsersService, private professorService: ProfessorService){}

    @Public()
  @Get()
  async getAll(): Promise<Professor[]> {
    return await this.professorService.all();
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<Professor> {
    return this.professorService.get(id);
  }

  @Public()
  @Post()
  async add(@Body() professor: Professor): Promise<Professor[]> {
    return this.professorService.add(professor);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Professor[]> {
    return this.professorService.delete(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() professor: Professor): Promise<Professor[]> {
    return this.professorService.update(id, professor);
  }
}
