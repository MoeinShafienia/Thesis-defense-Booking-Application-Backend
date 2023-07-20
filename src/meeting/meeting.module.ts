import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { ProfessorService } from 'src/professor/professor.service';
import { StudentService } from 'src/student/student.service';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { StudentRepository } from 'src/student/student.repository';
import { ProfessorRepository } from 'src/professor/professor.repository';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService, EmailService, StudentService, ProfessorService, StudentRepository, ProfessorRepository],
})
export class MeetingModule {}
