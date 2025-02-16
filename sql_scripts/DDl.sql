-- Teacher table
CREATE TABLE teacher (
    teacher_id   SERIAL PRIMARY KEY,
    teacher_name VARCHAR(100) NOT NULL
);

-- Student table
CREATE TABLE student (
    student_id   SERIAL PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    teacher_id   INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher (teacher_id) ON DELETE CASCADE
);

-- Semester table
CREATE TABLE semester (
    semester_id      SERIAL PRIMARY KEY,
    semester_number  INT NOT NULL CHECK (semester_number BETWEEN 1 AND 8),
    start_date       DATE NOT NULL,
    end_date         DATE NOT NULL,
    year             INT NOT NULL
);

-- Student_Semester_Grade table
CREATE TABLE student_semester_grade (
    student_id  INT NOT NULL,
    semester_id INT NOT NULL,
    grade       CHAR(2) NOT NULL,
    gpa_value   DECIMAL(3,2) NOT NULL CHECK (gpa_value BETWEEN 0.00 AND 4.00),
    PRIMARY KEY (student_id, semester_id),
    FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (semester_id) REFERENCES semester(semester_id) ON DELETE CASCADE
);