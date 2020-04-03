var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db"
});

connection.connect(function(err) {
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
        "View all employees by Department",
        "View all employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View all Roles"
      ]
    })
    .then(function(answer) {
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
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          addEmployeeManager();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "exit":
          break;
      }
    });
}
const listAllEmployees = () => {
  connection.query("SELECT * FROM employee", function(err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's id number?"
      },
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "roleid",
        type: "input",
        message: "What is the employee's role id?"
      },
      {
        name: "managerid",
        type: "input",
        message: "What is the employee's manager id?"
      }
    ])
    .then(function(answers) {
      console.log("Answers", answers);
      // connection.query("SELECT * FROM employee", function(err, result, fields) {
      //   if (err) throw err;
      //   console.log(result);
      // });
      let bodyValues = [
        answers.id,
        answers.firstname,
        answers.lastname,
        answers.roleid,
        answers.managerid
      ];
      connection.query(
        "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)",
        bodyValues,
        function(err, result) {
          if (err) {
            throw err;
          }
          console.log("Got the :" + result);
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
        message: "Which employee would you like to delete from the table?"
      }
    ])
    .then(function(answers) {
      console.log("Answers", answers);
      connection.query(
        "DELETE from employee WHERE (first_name) VALUES (?)",
        answers.firstname,
        function(err, result) {
          if (err) {
            throw err;
          }
          console.log("Got the :" + result);
        }
      );
    });
};
