import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { StudentService } from './student.service';

@Controller('api/student')
export class StudentController {
    constructor(private userService: UsersService, private studentService: StudentService){}
  @Post()
  @Public()
  getHello4(@Body() student: any) {
    this.userService.addUser(student.id, 'student', student.nationalCode)
    this.studentService.all().push(student);
    return this.studentService.all();
  }

  @Public()
  @Get()
  getHello2(): any[] {
    return this.studentService.all();
  }
}
