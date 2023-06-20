const express = require('express')
const inquirer = require('inquirer')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: false}));
app.use(express.json())

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
)


inquirer
    .createPromptModule([
        {
            type:'list',
            name: 'main menu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
