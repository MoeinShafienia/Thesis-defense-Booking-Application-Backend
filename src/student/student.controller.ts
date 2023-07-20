import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('api/student')
export class StudentController {
  constructor(
    private userService: UsersService,
    private studentService: StudentService,
  ) {}

  @Public()
  @Get()
  async getAll(): Promise<Student[]> {
    return await this.studentService.all();
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string): Promise<Student> {
    return this.studentService.get(id);
  }

  @Public()
  @Post()
  async add(@Body() student: Student): Promise<Student[]> {
    return this.studentService.add(student);
  }

  @Public()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Student[]> {
    return this.studentService.delete(id);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: string, @Body() student: Student): Promise<Student[]> {
    return this.studentService.update(id, student);
  }
}
