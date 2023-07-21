import { Professor } from "src/professor/professor.entity";
import { Student } from "src/student/student.entity";

export class Meeting{
    id: number;
    description: string;
    studentId: string;
    studentName: string;
    professorIds: string[];
    professorStatus: any[];
    startDate: string;
    endDate: string;
    dateStatus: any[];
    status: string;
    finalDate: string;
}