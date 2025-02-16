import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentSemesterGrade } from './StudentSemesterGrade';

@Entity({ name: 'semester' })
export class Semester {
  @PrimaryGeneratedColumn({ name: 'semester_id' })
  semesterId!: number;

  @Column({ name: 'semester_number', type: 'int' })
  semesterNumber!: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate!: Date;

  @Column({ name: 'year', type: 'int' })
  year!: number;

  @OneToMany(() => StudentSemesterGrade, (ssg) => ssg.semester)
  studentSemesterGrades?: StudentSemesterGrade[];
}
