"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSemesterGrade = void 0;
const typeorm_1 = require("typeorm");
const Student_1 = require("./Student");
const Semester_1 = require("./Semester");
let StudentSemesterGrade = class StudentSemesterGrade {
};
exports.StudentSemesterGrade = StudentSemesterGrade;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'student_id', type: 'int' })
], StudentSemesterGrade.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'semester_id', type: 'int' })
], StudentSemesterGrade.prototype, "semesterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade', type: 'char', length: 2 })
], StudentSemesterGrade.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gpa_value', type: 'decimal', precision: 3, scale: 2 })
], StudentSemesterGrade.prototype, "gpaValue", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.studentSemesterGrades, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' })
], StudentSemesterGrade.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Semester_1.Semester, (semester) => semester.studentSemesterGrades, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'semester_id' })
], StudentSemesterGrade.prototype, "semester", void 0);
exports.StudentSemesterGrade = StudentSemesterGrade = __decorate([
    (0, typeorm_1.Entity)({ name: 'student_semester_grade' })
], StudentSemesterGrade);
