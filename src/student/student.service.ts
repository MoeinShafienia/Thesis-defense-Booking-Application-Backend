import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async all(): Promise<Student[]> {
    return await this.studentRepository.getAll();
  }

  async get(id: string): Promise<Student> {
    return await this.studentRepository.getById(id);
  }

  async add(student: Student): Promise<Student[]> {
    await this.studentRepository.add(student);
    // this.userService.addUser(student.id, 'student', student.nationalcode);
    return this.all();
  }

  async update(id: string, student: Student): Promise<Student[]> {
    await this.delete(id);
    await this.add(student);
    return this.all();
  }

  async delete(id: string): Promise<Student[]> {
    await this.studentRepository.delete(id);
    return this.all();
  }
}
