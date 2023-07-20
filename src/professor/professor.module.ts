import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { UsersModule } from 'src/users/users.module';
import { ProfessorRepository } from './professor.repository';

@Module({
  providers: [ProfessorService, ProfessorRepository],
  controllers: [ProfessorController],
  imports: [UsersModule]
})
export class ProfessorModule {}
