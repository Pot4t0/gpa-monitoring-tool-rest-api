"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const Teacher_1 = require("./Teacher");
const StudentSemesterGrade_1 = require("./StudentSemesterGrade");
let Student = class Student {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'student_id' })
], Student.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_name', type: 'varchar', length: 100 })
], Student.prototype, "studentName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.students, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' })
], Student.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentSemesterGrade_1.StudentSemesterGrade, (ssg) => ssg.student)
], Student.prototype, "studentSemesterGrades", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)({ name: 'student' })
], Student);
