import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
    students = [
        {
          id: '9727693',
          name: 'moein shafienia',
          nationalCode: '4420875658',
          email: 'shafienia.moein+1@gmail.com',
          phoneNumber: '09130981305'
        },
      ];

    getByName(name) {
        return this.students.filter(x => x.name == name)[0]
    }

    all() {
        return this.students
    }
}
