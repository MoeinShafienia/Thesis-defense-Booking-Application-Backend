import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { AmoozeshService } from './amoozesh.service';
import { Amoozesh } from './amoozesh.entity';

@Controller('api/amoozesh')
export class AmoozeshController {
  constructor(
    private userService: UsersService,
    private amoozeshService: AmoozeshService,
  ) {}

  @Public()
  @Get()
  async getAll(): Promise<Amoozesh[]> {
    return await this.amoozeshService.all();
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<Amoozesh> {
    return this.amoozeshService.get(id);
  }

  @Public()
  @Post()
  async add(@Body() amoozesh: Amoozesh): Promise<Amoozesh[]> {
    return this.amoozeshService.add(amoozesh);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Amoozesh[]> {
    return this.amoozeshService.delete(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() amoozesh: Amoozesh): Promise<Amoozesh[]> {
    return this.amoozeshService.update(id, amoozesh);
  }
}
