import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

interface Amoozesh {
  id: string;
  nationalcode: string;
  name: string;
  email: string;
  phoneNumber: string;
}

@Injectable()
export class AmoozeshRepository {
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

  async getAll(): Promise<Amoozesh[]> {
    const query = 'SELECT * FROM amoozesh';
    try {
      const result: QueryResult = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving amoozeshs:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Amoozesh | null> {
    const query = 'SELECT * FROM amoozesh WHERE id = $1';
    try {
      const result: QueryResult = await this.pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error retrieving amoozesh by ID:', error);
      throw error;
    }
  }

  async add(amoozesh: Amoozesh): Promise<void> {
    const query = `
      INSERT INTO amoozesh (id, nationalcode, name, email, phoneNumber)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const amoozeshData = [
      amoozesh.id,
      amoozesh.nationalcode,
      amoozesh.name,
      amoozesh.email,
      amoozesh.phoneNumber,
    ];

    try {
      await this.pool.query(query, amoozeshData);
      console.log('Amoozesh added successfully!');
    } catch (error) {
      console.error('Error adding amoozesh:', error);
      throw error;
    }
  }

  async update(amoozesh: Amoozesh): Promise<void> {
    const query = `
      UPDATE amoozesh
      SET nationalcode = $2, name = $3, email = $4, phoneNumber = $5
      WHERE id = $1
    `;

    const amoozeshData = [
      amoozesh.id,
      amoozesh.nationalcode,
      amoozesh.name,
      amoozesh.email,
      amoozesh.phoneNumber,
    ];

    try {
      await this.pool.query(query, amoozeshData);
      console.log('Amoozesh updated successfully!');
    } catch (error) {
      console.error('Error updating amoozesh:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM amoozesh WHERE id = $1';
    try {
      await this.pool.query(query, [id]);
      console.log('Amoozesh deleted successfully!');
    } catch (error) {
      console.error('Error deleting amoozesh:', error);
      throw error;
    }
  }

  close(): void {
    this.pool.end();
  }
}
