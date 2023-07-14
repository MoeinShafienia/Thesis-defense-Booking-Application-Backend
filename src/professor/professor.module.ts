import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ProfessorService],
  controllers: [ProfessorController],
  imports: [UsersModule]
})
export class ProfessorModule {}
