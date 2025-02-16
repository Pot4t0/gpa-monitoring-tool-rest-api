# GPA Monitoring Tool REST API

This repository contains the solution for the GovTech Technical Assessment for the GPA Monitoring Tool REST API.

## Table of Contents

- [GPA Monitoring Tool REST API](#gpa-monitoring-tool-rest-api)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Running the Server Locally](#running-the-server-locally)
	- [API Specification](#api-specification)
	- [Deployed Website](#deployed-website)
	- [API Endpoints](#api-endpoints)
			- [Question 2 - Retrieve Students’ Information](#question-2---retrieve-students-information)
			- [Question 3 - Update: Assign a Student to a Different Teacher](#question-3---update-assign-a-student-to-a-different-teacher)
			- [Question 4 - Retrieve Students’ Cumulative GPA for a Specified Timeframe](#question-4---retrieve-students-cumulative-gpa-for-a-specified-timeframe)
	- [cURL Commands](#curl-commands)
			- [Q2 - Retrieve All Students\*\*](#q2---retrieve-all-students)
			- [Q3 - Update Student Assignment](#q3---update-student-assignment)
			- [Q4 - Retrieve Cumulative GPA by Timeframe](#q4---retrieve-cumulative-gpa-by-timeframe)
	- [Assumptions](#assumptions)

---

## Installation

1. **Install Dependencies:**

```bash
npm install
```

1. **Add environment file:**

.env file is added in source code that is submitted. Please place it in root directory so that the backend can connect to databse

## Running the Server Locally

**Development Server**

```bash
npm run dev
```

**Production Server**

```bash
npm run build
npm run start
```

**Docker Container**

```bash
docker build -t gpa-monitoring-tool .
docker run -p 3000:3000 gpa-monitoring-tool
```

## API Specification

**Local Documentation:**
http://127.0.0.1:3000/docs

**Deployed Documentation:**
https://gpa-monitoring-tool-rest-api.vercel.app/docs

## Deployed Website

https://gpa-monitoring-tool-rest-api.vercel.app/

## API Endpoints

**GET /students**

#### Question 2 - Retrieve Students’ Information

_Returns all students with:_

- Name
- Teacher’s name
- Cumulative GPA

**PUT /student/teacher**

#### Question 3 - Update: Assign a Student to a Different Teacher

_Updates a student’s teacher assignment. The update affects all past data._

```
{
  "studentId": 1,
  "newTeacherId": 2
}
```

**GET /students/gpa?start={number}&end={number}**

#### Question 4 - Retrieve Students’ Cumulative GPA for a Specified Timeframe

_Returns each student’s cumulative GPA, optionally calculated over the specified timeframe._

## cURL Commands

#### Q2 - Retrieve All Students\*\*

**Local:**

```
curl http://localhost:3000/students
```

**Deployed:**

```
curl https://gpa-monitoring-tool-rest-api.vercel.app/students
```

#### Q3 - Update Student Assignment

**To assign student with ID 1 to teacher with ID 2:**

```
curl -X PUT http://localhost:3000/student/teacher \
 -H "Content-Type: application/json" \
 -d '{"studentId": 1, "newTeacherId": 2}'
```

**Deployed:**

```
curl -X PUT https://gpa-monitoring-tool-rest-api.vercel.app/student/teacher \
 -H "Content-Type: application/json" \
 -d '{"studentId": 1, "newTeacherId": 2}'
```

#### Q4 - Retrieve Cumulative GPA by Timeframe

**Without timeframe filter:**

```
curl "http://localhost:3000/students/gpa"
curl "https://gpa-monitoring-tool-rest-api.vercel.app/students/gpa"
```

**With timeframe filter (e.g., semesters 7 to 8):**

```
curl "http://localhost:3000/students/gpa?start=7&end=8"
curl "https://gpa-monitoring-tool-rest-api.vercel.app/students/gpa?start=7&end=8"
```

## Assumptions

**Q2 and Q4:**
The endpoints return all student information (including teacher details) for all students.

**Q4:**
In addition to the cumulative GPA, the endpoint returns other student details (such as teacher information).

Although technically you could combine Q2 and Q4, the requirement is to have a separate endpoint for Q4.
