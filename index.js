const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();


// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'resources_db',
  password: 'Password'
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
