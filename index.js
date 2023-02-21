const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'resources_db',
  password: 'Killerqueen1909*'
});

// view all departments
app.get('/departments', (req, res) => {
    const query = 'SELECT department_id, department_name FROM departments';
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  // view all roles
  app.get('/roles', (req, res) => {
    const query = 'SELECT role_id, role_title, department_name, salary FROM roles INNER JOIN departments ON roles.department_id = departments.department_id';
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  // view all employees
  app.get('/employees', (req, res) => {
    const query = 'SELECT e.employee_id, e.first_name, e.last_name, r.role_title, d.department_name, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employees e LEFT JOIN roles r ON e.role_id = r.role_id LEFT JOIN departments d ON r.department_id = d.department_id LEFT JOIN employees m ON e.manager_id = m.employee_id';
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(results);
    });
  });
  
  // add a department
  app.post('/departments', (req, res) => {
    const departmentName = req.body.department_name;
    const query = `INSERT INTO departments (department_name) VALUES ('${departmentName}')`;
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Department added successfully');
    });
  });
  
  // add a role
  app.post('/roles', (req, res) => {
    const roleTitle = req.body.role_title;
    const salary = req.body.salary;
    const departmentId = req.body.department_id;
    const query = `INSERT INTO roles (role_title, salary, department_id) VALUES ('${roleTitle}', ${salary}, ${departmentId})`;
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send('Role added successfully');
    });
  });
  
  // add an employee
app.post('/employees', (req, res) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const roleId = req.body.role_id;
    const managerId = req.body.manager_id;
    const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`;
  
    connection.query(query, (err, results, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      res.json({
        status: 'success',
        message: 'Employee added successfully'
      });
    });
  });
  