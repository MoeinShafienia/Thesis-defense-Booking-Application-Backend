import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MeetingModule } from './meeting/meeting.module';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';
import { EmailService } from './email/email.service';
import { AmoozeshModule } from './amoozesh/amoozesh.module';

@Module({
  imports: [AuthModule, UsersModule, MeetingModule, ProfessorModule, StudentModule, AmoozeshModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    EmailService,],
})
export class AppModule {}
