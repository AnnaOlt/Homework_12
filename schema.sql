
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee
(
  id INT NOT NULL,
  first_name VARCHAR(11) NOT NULL,
  last_name VARCHAR(11) NOT NULL,
  role_id INT (11) NOT NULL,
  manager_id INT(11) DEFAULT NULL,
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS department;

CREATE TABLE department
(
  id INT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

DROP TABLE IF EXISTS _Role;

CREATE TABLE _Role
(
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,0) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);
INSERT INTO _Role
  (id, title, salary, department_id)
VALUES
  (201, "Manager", 100.00, 339),
  (202, "Sales", 60.00, 331),
  (203, "IT", 70.00, 332),
  (204, "CEO", 150.00, 338),
  (205, "Reception", 40.00, 333);

INSERT INTO employee
  (id, first_name, last_name, role_id, manager_id)
VALUES
  (101, "Anna", "Olt", 22, NULL),
  (102, "Mark", "Arnold", 23, NULL),
  (103, "Mary", "Smith", 24, NULL),
  (104, "Orsen", "Welles", 25, NULL),
  (105, "Arthur", "Vally", 26, NULL),
  (106, "Alex", "Olt", 27, NULL),
  (107, "Elizabeth", "Olt", 28, NULL);

INSERT INTO department
  (id, department_name)
VALUES
  (301, "Sales"),
  (302, "HR"),
  (303, "Reception"),
  (304, "IT"),
  (305, "CEO"),
  (306, "Manager");

SELECT *
FROM employees_db;