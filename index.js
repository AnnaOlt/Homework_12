var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employees_db"
});

connection.connect(function(err) {
  if (err) throw err;
  getQuestions();
});

function getQuestions() {
  inquirer
    .prompt({
      name: "ation",
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
    .then(function(res) {
      switch (res.action) {
        case "List all Employees":
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
          connection.end();
          break;
      }
    });
}
function listAllEmployees() {
  connection.query("SELECT * FROM employees_db.department", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
}
