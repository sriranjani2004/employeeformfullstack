// server.js (Express server)

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5002;

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employees'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, dateOfBirth, employeeId, salary, gender, department, designation, address, bloodGroup } = req.body;

  // Insert form data into the database
  const sql = 'INSERT INTO employee_details (name, date_of_birth, employee_id, salary, gender, department, designation, address, blood_group) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, dateOfBirth, employeeId, salary, gender, department, designation, address, bloodGroup], (err, result) => {
    if (err) {
      console.error('Error inserting form data into database:', err);
      // Send an error response and return to prevent further execution
      return res.status(500).send('Error inserting form data into database');
    }
    console.log('Form data inserted into database');
    res.status(200).send('Form data submitted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`⁠ Server is running on port ${port} ⁠`);
});
