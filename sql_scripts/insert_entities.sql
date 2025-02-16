INSERT INTO teacher (teacher_name) VALUES ('Alice Johnson');  -- Teacher 1
INSERT INTO teacher (teacher_name) VALUES ('Bob Smith');        -- Teacher 2

-- Teacher 1's students (IDs 1 to 5)
INSERT INTO student (student_name, teacher_id) VALUES ('Student One', 1);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Two', 1);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Three', 1);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Four', 1);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Five', 1);

-- Teacher 2's students (IDs 6 to 10)
INSERT INTO student (student_name, teacher_id) VALUES ('Student Six', 2);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Seven', 2);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Eight', 2);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Nine', 2);
INSERT INTO student (student_name, teacher_id) VALUES ('Student Ten', 2);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (1, '2020-08-01', '2020-11-30', 2020);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (2, '2021-01-01', '2021-04-30', 2021);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (3, '2021-08-01', '2021-11-30', 2021);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (4, '2022-01-01', '2022-04-30', 2022);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (5, '2022-08-01', '2022-11-30', 2022);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (6, '2023-01-01', '2023-04-30', 2023);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (7, '2023-08-01', '2023-11-30', 2023);

INSERT INTO semester (semester_number, start_date, end_date, year)
VALUES (8, '2024-01-01', '2024-04-30', 2024);