"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const Student_1 = require("./Student");
let Teacher = class Teacher {
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'teacher_id' })
], Teacher.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacher_name', type: 'varchar', length: 100 })
], Teacher.prototype, "teacherName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Student_1.Student, (student) => student.teacher)
], Teacher.prototype, "students", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Entity)({ name: 'teacher' })
], Teacher);
