import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './Student';
import { Semester } from './Semester';

@Entity({ name: 'student_semester_grade' })
export class StudentSemesterGrade {
  @PrimaryColumn({ name: 'student_id', type: 'int' })
  studentId!: number;

  @PrimaryColumn({ name: 'semester_id', type: 'int' })
  semesterId!: number;

  @Column({ name: 'grade', type: 'char', length: 2 })
  grade!: string;

  @Column({ name: 'gpa_value', type: 'decimal', precision: 3, scale: 2 })
  gpaValue!: number;

  @ManyToOne(() => Student, (student) => student.studentSemesterGrades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Semester, (semester) => semester.studentSemesterGrades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'semester_id' })
  semester!: Semester;
}
