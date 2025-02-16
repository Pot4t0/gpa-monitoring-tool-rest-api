import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './Student';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'teacher_id' })
  teacherId!: number;

  @Column({ name: 'teacher_name', type: 'varchar', length: 100 })
  teacherName!: string;

  @OneToMany(() => Student, (student) => student.teacher)
  students?: Student[];
}
