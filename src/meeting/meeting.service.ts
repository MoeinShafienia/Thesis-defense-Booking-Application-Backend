import { Injectable } from '@nestjs/common';
import { Meeting } from './meeting.entity';
import { ProfessorService } from 'src/professor/professor.service';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
const persianDate = require('persian-date');

const daysOfWeek = [ 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ]

@Injectable()
export class MeetingService {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly studentService: StudentService,
  ) {}
  meetings: Meeting[] = [
    {
      id: 1,
      studentId: '9727693',
      studentName: 'moein shafienia',
      description: '[RouterExplorer] Mapped {/api/student, GET} route +0ms',
      professorIds: [],
      professorStatus: [
        {
          id: '971',
          name: 'moein shafienia',
          status: 'pending',
          description: 'test',
        },
        {
          id: '972',
          name: 'hashem',
          status: 'complete',
          description: 'test2',
        },
      ],
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      dateStatus: [
        {
          id: 1,
          time: '14-10',
          canFinilize: true,
          professorIds: ['971', '972'],
        },  
        {
          id: 2,
          time: '15-10',
          canFinilize: false,
          professorIds: ['971'],
        },  
      ],
      status: 'waitingForProfessors',
      finalDate: new Date().toDateString(),
    },
  ];

  // getBySutendName(name): Meeting {
  //   return this.meetings.filter((x) => x.student.name == name)[0];
  // }

  all(): Meeting[] {
    // this.meetings.forEach((m) => {
    //   m.student = this.studentService.get(m.studentId);
    // });

    // this.meetings.forEach((m) => {
    //   if (m.professorStatus) {
    //     m.professorStatus.forEach((ps) => {
    //       ps.professor = this.professorService.get(ps.professorId);
    //     });
    //   }
    // });
    return this.meetings;
  }

  get(id: number): Meeting {
    let meeting = this.meetings.filter((x) => x.id == id)[0];
    // meeting.student = this.studentService.get(meeting.studentId);
    // meeting.professorStatus.forEach((ps) => {
    //   ps.professor = this.professorService.get(ps.professorId);
    // });
    return meeting;
  }

  getProfessorStatus(id: number): any {
    let meeting = this.meetings.filter((x) => x.id == id)[0];
    return meeting.professorStatus;
  }

  getDateStatus(id: number): any {
    let meeting = this.meetings.filter((x) => x.id == id)[0];
    return meeting.dateStatus;
  }

  add(meeting: Meeting): Meeting[] {
    let newMeeting = new Meeting();
    newMeeting.id = Math.max(...this.meetings.map((x) => x.id)) + 1;
    newMeeting.description = meeting.description;
    newMeeting.studentId = meeting.studentId;
    newMeeting.professorIds = [];
    newMeeting.professorStatus = [];
    newMeeting.dateStatus = [];
    newMeeting.status = 'waiting for student to add professors';
    newMeeting.finalDate = null;
    newMeeting.startDate = null;
    newMeeting.endDate = null;

    this.meetings.push(newMeeting);
    // this.userService.addUser(meeting.id, 'meeting', meeting.nationalcode);
    return this.all();
  }

  delete(id: number): Meeting[] {
    let meeting = this.get(id);
    const objWithIdIndex = this.meetings.findIndex((obj) => obj.id === id);

    if (objWithIdIndex > -1) {
      this.meetings.splice(objWithIdIndex, 1);
    }

    return this.all();
  }

  addProfessor(id: number, professorId: string, description: string): Meeting {
    let meeting = this.get(id);

    if (meeting.finalDate) {
      // meeting is final
    }

    if (meeting.professorIds.some((x) => x == professorId)) {
      // duplicate
    }

    meeting.professorIds.push(professorId);
    meeting.professorStatus.push({
      professorId: professorId,
      status: 'pending',
      description: description,
    });

    return this.get(id);
  }

  changeDate(id: number, body: any): Meeting {
    let meeting = this.get(id);

    if (meeting.finalDate) {
      // final
    }

    if (body.endDate < body.startDate) {
      // bad data
    }

    meeting.startDate = body.startDate;
    meeting.endDate = body.endDate;
    this.setMeetingDateStatus(meeting);
    if (meeting.professorIds && meeting.professorIds.length > 0) {
      meeting.status = 'waiting for professors to fill their times';
    }

    if (meeting.professorStatus) {
      meeting.professorStatus.forEach((x) => {
        x.status = 'pending';
      });
    }

    return this.get(id);
  }

  setMeetingDateStatus(meeting: Meeting) {
    let date = meeting.startDate.split('/');
    let date2 = meeting.endDate.split('/');
    let day1 = new persianDate([date[0], date[1], date[2]]);
    let day2 = new persianDate([date2[0], date2[1], date2[2]]);
    let daysForMeeting = Math.abs(day1.diff(day2, 'days') / 10) + 1;
    let timesLists = this.getDaysFrom(
      day1.toLocale('en').format('dddd'),
      daysForMeeting,
    );

    console.log(timesLists);

    meeting.dateStatus = [];
    let id = 1;
    timesLists.forEach((t) => {
      meeting.dateStatus.push({
        id: id,
        time: t,
        canFinilize: false,
        professorIds: [],
      });
      id++;
    });
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

  setProfessoeDates(id: number, dates: number[], professorId: string): Meeting {
    let meeting = this.get(id);

    if (meeting.finalDate) {
      // final
    }

    if (!meeting.professorIds.some((x) => x == professorId)) {
      // wrong prof
    }

    meeting.dateStatus.forEach((ds) => {
      let index = ds.professorIds.indexOf(professorId);

      if (index > -1) {
        ds.professorIds.splice(index, 1);
      }

      if (dates.some((d) => d == ds.id)) {
        ds.professorIds.push(professorId);
      }

      if (ds.professorIds.length == meeting.professorIds.length) {
        ds.canFinilize = true;
      }
    });

    if (meeting.professorStatus) {
      meeting.professorStatus.filter(
        (x) => x.professorId == professorId,
      )[0].status = 'complete';
    }

    return this.get(id);
  }

  finilize(id: number, dateId: number): Meeting {
    let meeting = this.get(id);

    let date = meeting.dateStatus.filter((x) => x.id == dateId)[0];

    if (!date.canFinilize) {
      // error
    }

    meeting.status = 'finilize';
    meeting.finalDate = date.time;

    return this.get(id);
  }
}
