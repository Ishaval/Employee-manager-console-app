import inquirer from "inquirer";

import mysql from "mysql";
import cTable from "console.table";

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Killerqueen1909*',
  database : 'resources_db'
});
 
const menu = ([
    
    {
        type: "list",
        name: "container",
        message: "What do you want to do?",
        choices:[
          "view all departments", 
            "view all roles", 
            "view all employees", 
           "add a department", 
            "add a role", 
           "add an employee", 
           "update an employee role"
        ]
    }
    
])

function viewMenu() {
  
    inquirer.prompt(menu).then((answer) => {
      if (answer.container == "view all departments") {
        connection.query('SELECT * FROM departments', function (error, results, fields) {
          if (error) throw error;
          console.table(results);
          viewMenu();
        });
      } else if (answer.container == "view all roles") {
        connection.query('SELECT * FROM roles', function (error, results, fields) {
          if (error) throw error;
          console.table(results);
          viewMenu();
        });
      } else if (answer.container == "view all employees") {
        connection.query('SELECT * FROM employees', function (error, results, fields) {
          if (error) throw error;
          console.table(results);
          viewMenu();
        });
      } else if (answer.container == "add a department") {
        const questions = [
          {
            type: 'input',
            name: 'name',
            message: "what is the name of this new department"
          }
        ];
        inquirer.prompt(questions).then((answers) => {
          connection.query(
            'INSERT INTO departments (name) VALUES (?)',
            [answers.name],
            function (error, results, fields) {
              if(error) throw error;
              console.log(`New department ${answers.name} added to the database!`);
              viewMenu();
            }
          )
        })
      } else if (answer.container == "add a role") {
        const questions = [

          {
            type: 'input',
            name: 'title',
            message: "What is the new role name?"
          },

          {
            type: 'input',
            name: 'salary',
            message: "what is the salary for the new role?"
          },

          {
            type: 'input',
            name: 'department_id',
            message: "What is the department's ID?"
          }
        ];
        inquirer.prompt(questions).then((answers) => {
          connection.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.title, answers.salary, answers.department_id],
            function (error, results, fields) {
              if (error) throw error;
              console.log(`New role ${answers.title} added to the database!`);
              viewMenu();
            })
       })
      } else if (answer.container == "add an employee") {
        const questions = [
          {
              type: 'input',
              name: 'first_name',
              message: "What is the employee's first name?",
          },
          {
              type: 'input',
              name: 'last_name',
              message: "What is the employee's last name?",
          },
          {
              type: 'input',
              name: 'role_id',
              message: "What is the employee's role ID?",
          },
          {
              type: 'input',
              name: 'manager_id',
              message: "What is the employee's manager ID?",
          },
      ];
      inquirer.prompt(questions).then((answers) => {
          connection.query(
              'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
              [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
              function (error, results, fields) {
                  if (error) throw error;
                  console.log(`New employee ${answers.first_name} ${answers.last_name} added to the database!`);
                  viewMenu(); 
              });
      });
      } else if (answer.container == "update an employee role") {
        const questions = [
          {
            type: "input",
            name: "employee_id",
            message: "Enter the ID of the employee to update:",
          },
          {
            type: "input",
            name: "role_id",
            message: "Enter the new role ID for the employee:",
          },
        ];
      
        inquirer.prompt(questions).then((answers) => {
          const { employee_id, role_id } = answers;
      
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [role_id, employee_id],
            (err, res) => {
              if (err) throw err;
              console.log(`Employee with ID ${employee_id} updated successfully.`);
              viewMenu();
            }
          );
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  connection.connect();
  viewMenu();