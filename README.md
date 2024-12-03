 # CAFETERIA MANAGEMENT SYSTEM #

A simple web-based Cafeteria Management System built using Java, HTML, CSS, and JavaScript. This project enables users to browse the menu, place orders, view an order summary, and proceed to payment.
Features
View a dynamic menu with item prices.
Add items to an order.
Display order summary with total cost calculation.
Basic payment options (UPI, Card, and Cash placeholders).
Admin Dashboard: Manage users (instructors/students), monitor system activity, and analyze performance metrics. Instructor Dashboard: Create and manage courses, evaluate students, and view enrolled students. Student Dashboard: Enroll in courses, view progress, and complete assessments. Database Management: MySQL database to store user, course, and enrollment data. JDBC Implementation: Seamless integration for database operations.

project Structure
![image](https://github.com/user-attachments/assets/f5eb67b4-684f-4f2e-9470-7e916846406f)


Technologies Used
Programming Language: Java Database: MySQL Frameworks/Tools: IntelliJ IDEA JDBC for database connectivity Maven (optional, for dependency management)

#Database Schema

README File for Online Learning Management System Here’s a professional README.md file template for your project. It includes sections to describe the project, your team members, technologies used, and how to set it up. This README will look polished on GitHub.

Online Learning Management System (LMS) Introduction The Online Learning Management System (LMS) is a platform where instructors can create and manage courses, students can enroll in and complete courses, and administrators can oversee the system. This project provides dedicated dashboards for each user type and facilitates course creation, management, enrollment, and performance tracking.

Features Admin Dashboard: Manage users (instructors/students), monitor system activity, and analyze performance metrics. Instructor Dashboard: Create and manage courses, evaluate students, and view enrolled students. Student Dashboard: Enroll in courses, view progress, and complete assessments. Database Management: MySQL database to store user, course, and enrollment data. JDBC Implementation: Seamless integration for database operations. Project Structure python Copy code LMS/ ├── src/ │ ├── main/ │ │ ├── java/ │ │ │ ├── dao/ # Data Access Objects │ │ │ ├── model/ # Models for Users, Courses, Enrollments │ │ │ ├── service/ # Service classes for business logic │ │ │ ├── controller/ # Main application logic │ │ │ └── util/ # Utility classes (Database connection, etc.) │ │ └── resources/ │ │ └── application.properties # Database configuration ├── README.md ├── pom.xml (if Maven is used) └── .idea/ Technologies Used Programming Language: Java Database: MySQL Frameworks/Tools: IntelliJ IDEA JDBC for database connectivity Maven (optional, for dependency management) Database Schema Tables: Users: Stores information about admins, instructors, and students. Courses: Stores details of courses created by instructors. Enrollments: Tracks student enrollments in courses.

#Schema Details

CREATE DATABASE LMS;

USE LMS;

CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, role ENUM('ADMIN', 'INSTRUCTOR', 'STUDENT') NOT NULL );

CREATE TABLE courses ( id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, instructor_id INT, FOREIGN KEY (instructor_id) REFERENCES users(id) );

CREATE TABLE enrollments ( id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, student_id INT, status ENUM('ENROLLED', 'COMPLETED'), FOREIGN KEY (course_id) REFERENCES courses(id), FOREIGN KEY (student_id) REFERENCES users(id) );

#How to Run Prerequisites Install Java Development Kit (JDK). Install MySQL. Install IntelliJ IDEA.

steps

Clone the Repository: (git clone https://github.com/your-repo/OnlineLearningManagementSystem.git ) 2)Set up the Database:
Run the provided SQL scripts in MySQL to create the required tables.

Configure Database in the Application: Update the application.properties file with your MySQL credentials:
(jdbc.url=jdbc:mysql://localhost:3306/LMS jdbc.username=root jdbc.password=yourpassword jdbc.driver=com.mysql.cj.jdbc.Driver )

Run the Application:
Open the project in IntelliJ IDEA. Run the Main class located in the controller package.

#Team Members samiksha singh -Team leader-
Raj kumar sharma Prasoon kumar Rishita gupta

#Project Objective Provide a user-friendly platform for managing online education. Ensure secure database management using MySQL and JDBC. Offer dynamic features like role-based dashboards for admins, instructors, and students.

#Future Enhancements Add features for course assessments and grading. Integrate multimedia (video, quizzes) into courses. Develop a front-end web application using React or Angular. Implement authentication and authorization using Spring Security.

Contributing
We welcome contributions to improve the project. Fork the repository, create a feature branch, and submit a pull request.

#Contact For queries or collaborations, contact: Raj kumar sharma( raj7234271@gmail.com) Prasoon kumar singh(prasoonp.mzp@gmail.com)

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Report repository
Releases
No releases published
Packages
No packages published
Contributors
2
@cheery723
cheery723
@rksdeveloper
rksdeveloper Raj kumar sharma
Languages
Java
100.0%
Footer

