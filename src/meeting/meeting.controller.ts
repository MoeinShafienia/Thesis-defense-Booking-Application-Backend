import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { EmailService } from 'src/email/email.service';
import { MeetingService } from 'src/meeting/meeting.service';
import { StudentService } from 'src/student/student.service';
import { Meeting } from './meeting.entity';
const persianDate = require('persian-date');

const daysOfWeek = [ 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

@Controller('api/meeting')
export class MeetingController {
  constructor(private readonly emailService : EmailService, private studentService: StudentService,
    private meetingService: MeetingService){}

    @Public()
    @Get()
    getAll(): Meeting[] {
      return this.meetingService.all();
    }
  
    @Public()
    @Get(':id')
    get(@Param('id') id: number): Meeting {
      return this.meetingService.get(id);
    }
  
    @Public()
    @Post()
    add(@Body() meeting: Meeting): Meeting[] {
      return this.meetingService.add(meeting);
    }
  
    @Public()
    @Delete(':id')
    delete(@Param('id') id: number): Meeting[] {
      return this.meetingService.delete(id);
    }

    @Public()
    @Post(':id/date')
    changeDate(@Param('id') id: number, @Body() body): Meeting {
      return this.meetingService.changeDate(id, body);
    }

    @Public()
    @Post(':id/addprofessor/:professorId/:description')
    addProfessor(@Param('id') id: number, @Param('professorId') professorId: string, @Param('description') description: string): Meeting {
      return this.meetingService.addProfessor(id, professorId, description);
    }

    @Public()
    @Post(':id/setdate/:professorId/')
    setProfessorDate(@Param('id') id: number, @Param('professorId') professorId: string, @Body() body): Meeting {
      return this.meetingService.setProfessoeDates(id, body, professorId);
    }

    @Public()
    @Post(':id/finilize/:dateId')
    finilize(@Param('id') id: number, @Param('dateId') dateId: number): Meeting {
      return this.meetingService.finilize(id, dateId);
    }

  
  // meetings = [
  //   {
  //     name: 'ali',
  //     age: 22,
  //     meetings: [
  //       {
  //         name: 'nasihat',
  //         status: 'pending',
  //       },
  //       {
  //         name: 'nasihat2',
  //         status: 'pending',
  //       },
  //     ],
  //     times: [
  //       {
  //         name: 'shanbe',
  //         status: 'pending',
  //         meetings: ['nasihat', 'khanmiraza'],
  //       },
  //       {
  //         name: '1shanbe',
  //         status: 'complete',
  //         meetings: ['nasihat', 'hashari'],
  //       },
  //     ],
  //     pureTimes: ['shanbe', '1shanbe'],
  //   },
  // ];

  // @Post()
  // getHesll2o4(@Body() meeting, @Req() request) {
  //   const user = request.user;
  //   console.log(user);
  //   // console.log(meeting.startDate);
  //   // console.log(meeting.endDate);

  //   // let date = meeting.startDate.split("/")
  //   // let date2 = meeting.endDate.split("/")

  //   // let day1 = new persianDate([date[0],date[1],date[2]])
  //   // let day2 = new persianDate([date2[0],date2[1],date2[2]])

  //   // let daysForMeeting = Math.abs(day1.diff(day2, 'days') / 10) + 1
    
  //   // let timesLists = this.getDaysFrom(day1.toLocale('en').format('dddd'), daysForMeeting);

  //   // meeting.times = []
  //   // timesLists.forEach(time => {
  //   //   meeting.times.push({
  //   //     name: time,
  //   //     status: 'pending',
  //   //     meetings: []
  //   //   })
  //   // })
    
  //   this.meetings.push(meeting);
  //   let student = this.studentService.getByName(meeting.student)
  //   this.emailService.sendAddMeetingEmail(student);
  //   return this.meetings;
  // }

  // @Get()
  // getHesl2lo2(@Req() request): any[] {
  //   const user = request['user'];
  //   console.log(user);
  //   // return this.meetingService.getUserMeetings(user.username)
  //   return this.meetings;
  // }

  // @Get(':id')
  // getHessal2lo2(@Req() request, @Param('id') id: number): any {
  //   const user = request['user'];
  //   console.log(user);
  //   // return this.meetingService.getUserMeetings(user.username)
  //   return this.meetings.filter((x) => x.age == id)[0];
  // }

  // @Post(':id/meeting/times')
  // getHessa22l2lo2(@Req() request, @Param('id') id: number): any {
  //   const user = request['user'];
  //   console.log(user);
  //   console.log(request.body);

  //   this.meetings[0].meetings.filter(x => x.name == user.username)[0].status = 'complete'
  //   let meetingCount = this.meetings[0].meetings.length;

    
  //   this.meetings[0].times.forEach(time => time.meetings = time.meetings.filter(item => item !== user.username));
  //   this.meetings[0].times.forEach(time => time.status = 'pending');
  //   console.log(this.meetings[0].times);
  //   console.log('-------------------');
  //   request.body.forEach(incomingTime => {
  //     let times = this.meetings[0].times.filter(x => x.name == incomingTime)
  //     times.forEach(time => {
  //       time.meetings.push(user.username)
  //     })
      
  //   });

  //   this.meetings[0].times.forEach(time => {
  //     if(time.meetings.length == meetingCount){
  //       time.status = 'complete'
  //     }
  //   });

  //   console.log(this.meetings[0].times);
    

  //   // this.meetings[0].times = this.meetings[0].times.filter(x => x.)

  //   // return this.meetingService.getUserMeetings(user.username)
  //   return this.meetings.filter((x) => x.age == id)[0];
  // }

  // @Post(":id/meeting")
  // addMeeting(@Req() request, @Param('id') meetingId, @Body() meeting): any {
  //   const user = request['user'];
  //   console.log(user);

  //   this.meetings[0].meetings.push({
  //     name: meeting.name,
  //     status: 'pending'
  //   })
  //   let meetingEmail = this.meetingService.getByName(meeting.name)
  //   this.emailService.sendAddMeetingEmail(this.meetings[0].name, meetingEmail.email)
  //   // return this.meetingService.getUserMeetings(user.username)
  //   return this.meetings[0];
  // }

  // getDaysFrom(startingDay, n) {
  //   const startingIndex = daysOfWeek.indexOf(startingDay);
  //   const result = [];
  
  //   for (let i = 0; i < n; i++) {
  //     const currentIndex = (startingIndex + i) % daysOfWeek.length;
  //     result.push(daysOfWeek[currentIndex]);
  //   }
  
  //   return result;
  // }
}
