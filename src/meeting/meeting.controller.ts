import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { EmailService } from 'src/email/email.service';
import { ProfessorService } from 'src/professor/professor.service';
import { StudentService } from 'src/student/student.service';
const persianDate = require('persian-date');

const daysOfWeek = [ 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

@Controller('api/meeting')
export class MeetingController {
  constructor(private readonly emailService : EmailService, private studentService: StudentService,
    private professorService: ProfessorService){}
  meetings = [
    {
      name: 'ali',
      age: 22,
      professors: [
        {
          name: 'nasihat',
          status: 'pending',
        },
        {
          name: 'nasihat2',
          status: 'pending',
        },
      ],
      times: [
        {
          name: 'shanbe',
          status: 'pending',
          professors: ['nasihat', 'khanmiraza'],
        },
        {
          name: '1shanbe',
          status: 'complete',
          professors: ['nasihat', 'hashari'],
        },
      ],
      pureTimes: ['shanbe', '1shanbe'],
    },
  ];

  @Post()
  getHesll2o4(@Body() meeting, @Req() request) {
    const user = request.user;
    console.log(user);
    // console.log(meeting.startDate);
    // console.log(meeting.endDate);

    // let date = meeting.startDate.split("/")
    // let date2 = meeting.endDate.split("/")

    // let day1 = new persianDate([date[0],date[1],date[2]])
    // let day2 = new persianDate([date2[0],date2[1],date2[2]])

    // let daysForMeeting = Math.abs(day1.diff(day2, 'days') / 10) + 1
    
    // let timesLists = this.getDaysFrom(day1.toLocale('en').format('dddd'), daysForMeeting);

    // meeting.times = []
    // timesLists.forEach(time => {
    //   meeting.times.push({
    //     name: time,
    //     status: 'pending',
    //     professors: []
    //   })
    // })
    
    this.meetings.push(meeting);
    let student = this.studentService.getByName(meeting.student)
    this.emailService.sendAddMeetingEmail(student);
    return this.meetings;
  }

  @Get()
  getHesl2lo2(@Req() request): any[] {
    const user = request['user'];
    console.log(user);
    // return this.meetingService.getUserMeetings(user.username)
    return this.meetings;
  }

  @Get(':id')
  getHessal2lo2(@Req() request, @Param('id') id: number): any {
    const user = request['user'];
    console.log(user);
    // return this.meetingService.getUserMeetings(user.username)
    return this.meetings.filter((x) => x.age == id)[0];
  }

  @Post(':id/professor/times')
  getHessa22l2lo2(@Req() request, @Param('id') id: number): any {
    const user = request['user'];
    console.log(user);
    console.log(request.body);

    this.meetings[0].professors.filter(x => x.name == user.username)[0].status = 'complete'
    let professorCount = this.meetings[0].professors.length;

    
    this.meetings[0].times.forEach(time => time.professors = time.professors.filter(item => item !== user.username));
    this.meetings[0].times.forEach(time => time.status = 'pending');
    console.log(this.meetings[0].times);
    console.log('-------------------');
    request.body.forEach(incomingTime => {
      let times = this.meetings[0].times.filter(x => x.name == incomingTime)
      times.forEach(time => {
        time.professors.push(user.username)
      })
      
    });

    this.meetings[0].times.forEach(time => {
      if(time.professors.length == professorCount){
        time.status = 'complete'
      }
    });

    console.log(this.meetings[0].times);
    

    // this.meetings[0].times = this.meetings[0].times.filter(x => x.)

    // return this.meetingService.getUserMeetings(user.username)
    return this.meetings.filter((x) => x.age == id)[0];
  }

  @Post(":id/professor")
  addProfessor(@Req() request, @Param('id') meetingId, @Body() professor): any {
    const user = request['user'];
    console.log(user);

    this.meetings[0].professors.push({
      name: professor.name,
      status: 'pending'
    })
    let professorEmail = this.professorService.getByName(professor.name)
    this.emailService.sendAddProfessorEmail(this.meetings[0].name, professorEmail.email)
    // return this.meetingService.getUserMeetings(user.username)
    return this.meetings[0];
  }

  getDaysFrom(startingDay, n) {
    const startingIndex = daysOfWeek.indexOf(startingDay);
    const result = [];
  
    for (let i = 0; i < n; i++) {
      const currentIndex = (startingIndex + i) % daysOfWeek.length;
      result.push(daysOfWeek[currentIndex]);
    }
  
    return result;
  }
}
