import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './Teacher';
import { StudentSemesterGrade } from './StudentSemesterGrade';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'student_id' })
  studentId!: number;

  @Column({ name: 'student_name', type: 'varchar', length: 100 })
  studentName!: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @OneToMany(() => StudentSemesterGrade, (ssg) => ssg.student)
  studentSemesterGrades?: StudentSemesterGrade[];
}
