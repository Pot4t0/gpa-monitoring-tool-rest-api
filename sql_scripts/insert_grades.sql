DO $$
DECLARE
  stu INT;
  sem INT;
  gradeIndex INT;
  gradeChar CHAR(1);
  gpaValue DECIMAL(3,2);
BEGIN
  FOR stu IN 1..10 LOOP
    FOR sem IN 1..8 LOOP
      gradeIndex := (stu + sem) % 5;
      
      CASE gradeIndex
        WHEN 0 THEN
          gradeChar := 'A';
          gpaValue := 4.00;
        WHEN 1 THEN
          gradeChar := 'B';
          gpaValue := 3.00;
        WHEN 2 THEN
          gradeChar := 'C';
          gpaValue := 2.00;
        WHEN 3 THEN
          gradeChar := 'D';
          gpaValue := 1.00;
        WHEN 4 THEN
          gradeChar := 'F';
          gpaValue := 0.00;
      END CASE;
      
      INSERT INTO student_semester_grade (student_id, semester_id, grade, gpa_value)
      VALUES (stu, sem, gradeChar, gpaValue);
    END LOOP;
  END LOOP;
END $$;