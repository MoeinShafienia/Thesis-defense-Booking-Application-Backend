import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

interface Student {
  id: string;
  nationalcode: string;
  name: string;
  email: string;
  phoneNumber: string;
}

@Injectable()
export class StudentRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
        host: 'localhost',
        port: '54320',
        database: 'bla',
        user: 'user',
        password: 'admin',
      });
  }

  async getAll(): Promise<Student[]> {
    const query = 'SELECT * FROM student';
    try {
      const result: QueryResult = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving students:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Student | null> {
    const query = 'SELECT * FROM student WHERE id = $1';
    try {
      const result: QueryResult = await this.pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error retrieving student by ID:', error);
      throw error;
    }
  }

  async add(student: Student): Promise<void> {
    const query = `
      INSERT INTO student (id, nationalcode, name, email, phoneNumber)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const studentData = [
      student.id,
      student.nationalcode,
      student.name,
      student.email,
      student.phoneNumber,
    ];

    try {
      await this.pool.query(query, studentData);
      console.log('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  }

  async update(student: Student): Promise<void> {
    const query = `
      UPDATE student
      SET nationalcode = $2, name = $3, email = $4, phoneNumber = $5
      WHERE id = $1
    `;

    const studentData = [
      student.id,
      student.nationalcode,
      student.name,
      student.email,
      student.phoneNumber,
    ];

    try {
      await this.pool.query(query, studentData);
      console.log('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM student WHERE id = $1';
    try {
      await this.pool.query(query, [id]);
      console.log('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}
