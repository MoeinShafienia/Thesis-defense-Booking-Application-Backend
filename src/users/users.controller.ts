import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('api/user')
export class UsersController {

    constructor(private readonly userService: UsersService){}
    
  @Public()
  @Get('amoozesh')
  getHello2(): any[] {
    return this.userService.all().filter(x => x.type == 'amoozesh');
  }

  @Public()
  @Post('amoozesh')
  getH2ello2(@Body() user) {
    this.userService.addUser(user.username, 'amoozesh', user.password);
    return this.userService.all().filter(x => x.type == 'amoozesh');
  }

  @Public()
  @Get('db')
  getH2el33lo2() {
    return this.userService.createTable()
  }
}
