import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

interface Professor {
  id: string;
  nationalcode: string;
  name: string;
  email: string;
  phoneNumber: string;
}

@Injectable()
export class ProfessorRepository {
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

  async getAll(): Promise<Professor[]> {
    const query = 'SELECT * FROM professor';
    try {
      const result: QueryResult = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving professors:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Professor | null> {
    const query = 'SELECT * FROM professor WHERE id = $1';
    try {
      const result: QueryResult = await this.pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error retrieving professor by ID:', error);
      throw error;
    }
  }

  async add(professor: Professor): Promise<void> {
    const query = `
      INSERT INTO professor (id, nationalcode, name, email, phoneNumber)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const professorData = [
      professor.id,
      professor.nationalcode,
      professor.name,
      professor.email,
      professor.phoneNumber,
    ];

    try {
      await this.pool.query(query, professorData);
      console.log('Professor added successfully!');
    } catch (error) {
      console.error('Error adding professor:', error);
      throw error;
    }
  }

  async update(professor: Professor): Promise<void> {
    const query = `
      UPDATE professor
      SET nationalcode = $2, name = $3, email = $4, phoneNumber = $5
      WHERE id = $1
    `;

    const professorData = [
      professor.id,
      professor.nationalcode,
      professor.name,
      professor.email,
      professor.phoneNumber,
    ];

    try {
      await this.pool.query(query, professorData);
      console.log('Professor updated successfully!');
    } catch (error) {
      console.error('Error updating professor:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM professor WHERE id = $1';
    try {
      await this.pool.query(query, [id]);
      console.log('Professor deleted successfully!');
    } catch (error) {
      console.error('Error deleting professor:', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}
