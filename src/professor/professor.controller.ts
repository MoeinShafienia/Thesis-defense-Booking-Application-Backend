import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { ProfessorService } from './professor.service';

@Controller('api/professor')
export class ProfessorController {
    constructor(private userService: UsersService, private professorService: ProfessorService){}

  @Public()
  @Post()
  getHell2o4(@Body() professor: any) {
    this.userService.addUser(professor.phoneNumber, 'professor', professor.id)
    this.professorService.all().push(professor);
    return this.professorService.all();
  }

  @Public()
  @Get()
  getHel2lo2(): any[] {
    return this.professorService.all();
  }

  @Public()
  @Post()
  getHaaell2o4(@Body() times: any) {
    this.professorService.ChangeTimes(times)
    return this.professorService.all();
  }
}
