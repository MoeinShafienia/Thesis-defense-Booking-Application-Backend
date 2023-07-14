import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessorService {
    professors = [
        {
          id: '4420875659',
          phoneNumber: '09130981398',
          name: 'behrooz nasihatkon',
          email: 'shafienia.moein+2@gmail.com'
        },
      ];

    all(){
        return this.professors
    }

    ChangeTimes(timse: any){
        
    }

    getByName(name){
        return this.professors.filter(x => x.name == name)[0]
    }
}
