"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Semester = void 0;
const typeorm_1 = require("typeorm");
const StudentSemesterGrade_1 = require("./StudentSemesterGrade");
let Semester = class Semester {
};
exports.Semester = Semester;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'semester_id' })
], Semester.prototype, "semesterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'semester_number', type: 'int' })
], Semester.prototype, "semesterNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' })
], Semester.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' })
], Semester.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'year', type: 'int' })
], Semester.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentSemesterGrade_1.StudentSemesterGrade, (ssg) => ssg.semester)
], Semester.prototype, "studentSemesterGrades", void 0);
exports.Semester = Semester = __decorate([
    (0, typeorm_1.Entity)({ name: 'semester' })
], Semester);
