import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { ProfessorService } from 'src/professor/professor.service';
import { StudentService } from 'src/student/student.service';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService, EmailService, StudentService, ProfessorService],
})
export class MeetingModule {}
