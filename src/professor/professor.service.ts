import { Injectable } from '@nestjs/common';
import { Professor } from './professor.entity';
import { ProfessorRepository } from './professor.repository';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  Professors: Professor[] = [
    {
      id: 'string',
      nationalcode: 'string',
      name: 'string',
      email: 'string',
      phoneNumber: 'string',
    },
    {
      id: 'string2',
      nationalcode: 'string2',
      name: 'string2',
      email: 'string2',
      phoneNumber: 'string2',
    },
    {
      id: 'string3',
      nationalcode: 'string3',
      name: 'string3',
      email: 'string3',
      phoneNumber: 'string3',
    },
  ];

  async all(): Promise<Professor[]> {
    return await this.professorRepository.getAll();
  }

  async allTest(): Promise<Professor[]> {
    return this.Professors;
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
