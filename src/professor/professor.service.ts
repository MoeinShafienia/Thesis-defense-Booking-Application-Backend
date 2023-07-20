import { Injectable } from '@nestjs/common';
import { Professor } from './professor.entity';
import { ProfessorRepository } from './professor.repository';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async all(): Promise<Professor[]> {
    return await this.professorRepository.getAll();
  }

  async get(id: string): Promise<Professor> {
    return await this.professorRepository.getById(id);
  }

  async add(professor: Professor): Promise<Professor[]> {
    await this.professorRepository.add(professor);
    // this.userService.addUser(professor.id, 'professor', professor.nationalcode);
    return this.all();
  }

  async update(id: string, professor: Professor): Promise<Professor[]> {
    await this.delete(id);
    await this.add(professor);
    return this.all();
  }

  async delete(id: string): Promise<Professor[]> {
    await this.professorRepository.delete(id);
    return this.all();
  }
}
