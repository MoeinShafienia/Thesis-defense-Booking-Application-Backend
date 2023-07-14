import { Injectable } from '@nestjs/common';

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

  
}