import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { UsersModule } from 'src/users/users.module';
import { StudentRepository } from './student.repository';

@Module({
  providers: [StudentService, StudentRepository],
  controllers: [StudentController],
  imports: [UsersModule]
})
export class StudentModule {}
