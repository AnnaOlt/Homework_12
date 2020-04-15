var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mysql");
  getQuestions();
});

function getQuestions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add Employee",
        "View all Departments",
        "Add Department",
        "View all Roles",
        "Add Employee Role",
        "Update Employee Role",
        "Remove Employee",
      ],
    })
    .then(function (answer) {
      console.log(" ");
      console.log("Your answer was: ", answer);
      switch (answer.action) {
        case "View all employees":
          console.log("Calling on listAllEmployees");
          listAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View all Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "Add Employee Role":
          addEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "exit":
          break;
      }
    });
}
const listAllEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's id number?",
      },
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the employee's role id?",
      },
      {
        name: "managerid",
        type: "input",
        message: "What is the employee's manager id?",
      },
    ])
    .then(function (answers) {
      console.table("Answers", answers);

      let bodyValues = [
        answers.id,
        answers.firstname,
        answers.lastname,
        answers.roleid,
        answers.managerid,
      ];
      connection.query(
        "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)",
        bodyValues,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.table("Got the :" + result);
        }
      );
    });
};

const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the department id?",
      },
      {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answers) {
      let bodyValues = [answers.id, answers.department];
      connection.query(
        "INSERT INTO department (id, department_name) VALUES (?, ?)",
        bodyValues,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("Got the :" + result);
        }
      );
    });
};

const viewAllRoles = () => {
  connection.query("SELECT * FROM _Role", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
  });
};

const addEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the role id?",
      },
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id?",
      },
    ])
    .then(function (answers) {
      let bodyValues = [
        answers.id,
        answers.title,
        answers.salary,
        answers.department_id,
      ];
      connection.query(
        "INSERT INTO _Role (id, title, salary, department_id) VALUES (?, ?, ?, ?)",
        bodyValues,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.table("Got the :" + result);
        }
      );
    });
};
const removeEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Which employee would you like to delete from the table?",
      },
    ])
    .then(function (answers) {
      connection.query(
        "DELETE from employee WHERE (first_name) VALUES (?)",
        answers.firstname,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.table("Got the :" + result);
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "input",
        message:
          "Which employee's role would you like to update? (Enter the employee ID)",
      },

      {
        name: "newRole",
        type: "input",
        message: "What would you like to set the new role? (Enter Role Id)",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET ? where ?",
        [
          {
            role_id: answer.newRole,
          },
          {
            id: answer.employee,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("The employee's role has been updated successfully!");
        }
      );
    });
};
