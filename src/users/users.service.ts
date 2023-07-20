import { Injectable } from '@nestjs/common';
const { Pool } = require('pg');

@Injectable()
export class UsersService {
    users = [];
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'moein',
        password: 'guess',
        type: 'student'
      },
      {
        userId: 2,
        username: 'nasihat',
        password: 'guess',
        type: 'professor'
      },
    ];
  }

  all() {
    return this.users
  }

  async findOne(username) {
    return this.users.find(user => user.username === username);
  }

  async addUser(name, type, password) {
    let maxUserId = this.users.map(x => x.userId).sort()[this.users.length - 1];
    this.users.push({
        userId: maxUserId + 1,
        username: name,
        password: password,
        type: type
    });
  }

  createTable(){
    const pool = new Pool({
      host: 'localhost',
      port: '54320',
      database: 'bla',
      user: 'user',
      password: 'admin',
    });

    // Example: querying the database
    pool.query(`CREATE TABLE admin (
      id VARCHAR(50) PRIMARY KEY,
      nationalcode VARCHAR(20) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      phoneNumber VARCHAR(20)
    );`, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }
    });

    // Example: querying the database
    pool.query(`CREATE TABLE student (
      id VARCHAR(50) PRIMARY KEY,
      nationalcode VARCHAR(20) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      phoneNumber VARCHAR(20)
    );`, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }
    });

    // Example: querying the database
    pool.query(`CREATE TABLE professor (
      id VARCHAR(50) PRIMARY KEY,
      nationalcode VARCHAR(20) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      phoneNumber VARCHAR(20)
    );`, (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }
    });

    // pool.query(`INSERT INTO student (id, nationalcode, name, email, phoneNumber)
    // VALUES ('1', '123456789', 'John Doe', 'johndoe@example.com', '+1234567890');
    // `, (err, result) => {
    //   if (err) {
    //     console.error('Error executing query', err);
    //   } else {
    //     console.log('Query result:', result.rows);
    //   }
    // });

    pool.end();
  }

  async addStudent() {
    const pool = new Pool({
      host: 'localhost',
      port: '54320',
      database: 'bla',
      user: 'user',
      password: 'admin',
    });

    const insertQuery = `
      INSERT INTO student (id, nationalcode, name, email, phoneNumber)
      VALUES ($1, $2, $3, $4, $5)
    `;
  
    const studentData = ['1', '123456789', 'John Doe', 'johndoe@example.com', '+1234567890'];
  
    try {
      await pool.query(insertQuery, studentData);
      console.log('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      pool.end();
    }
  }

  async getAllStudents() {
    const pool = new Pool({
      host: 'localhost',
      port: '54320',
      database: 'bla',
      user: 'user',
      password: 'admin',
    });
    const selectQuery = `
      SELECT * FROM student
    `;
  
    try {
      const result = await pool.query(selectQuery);
      console.log('All Students:');
      console.log(result.rows);
    } catch (error) {
      console.error('Error retrieving students:', error);
    } finally {
      pool.end();
    }
  }

  
}