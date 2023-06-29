//require packages
const inquirer = require('inquirer')
const mysql = require('mysql2')

//connects to mySQL db and displays message to console letting user know they are connected to db, or console logs the error
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        database: 'employee_tracker_db'
    },
    console.log('Connected to the employee_db database')
)
db.on('error', (error)=>{console.log(error)})

//imports built in util module that makes the promisify function available to the app
const util = require('util')
//wraps our db.query in the util.promisify so we can use async/await
db.query = util.promisify(db.query)

//creates the opening menu function that we can call at the end of each user selection to bring them back to main menu
function menu (){
inquirer
    .prompt([
        {
            type:'list',
            name: 'mainMenu',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
        }
    ]).then(data =>{
        if(data.mainMenu === 'View all departments') 
        viewAllDepartments()
        else if (data.mainMenu === 'View all roles')
        viewAllRoles()
        else if (data.mainMenu === 'View all employees')
        viewAllEmployees()
        else if (data.mainMenu === 'Add a department')
        addDepartment()
        else if (data.mainMenu === 'Add a role')
        addRole()
        else if (data.mainMenu === 'Add an employee')
        addEmployee()
        else if (data.mainMenu === 'Update an employee role')
        updateEmployee()
        else {db.close()}
    })
}
//invokes menu function
menu()

async function viewAllDepartments(){
    const results = await db.query('SELECT * FROM department')
    console.table(results)
    menu()
}

async function viewAllRoles(){
    const results = await db.query('SELECT * FROM role')
    console.table(results)
    menu()
}

async function viewAllEmployees(){
    const results = await db.query('SELECT * FROM employee')
    console.table(results)
    menu()
}

async function addDepartment(){

    inquirer.prompt([
        {
            type:'input',
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(async data =>{
        await db.query('INSERT INTO department (department_name) VALUES (?)', [data.addDepartment])
        console.log(` ✅ ${data.addDepartment} was added to departments`)
        menu()
    })
}

async function addRole(){

    menu()
}

async function addEmployee(){

    menu()
}

async function updateEmployee(){
    const employees = await db.query('SELECT id AS value, concat(first_name, " ", last_name) AS name from employee')
    const roles = await db.query('SELECT id AS value, title as name FROM role')
    inquirer.prompt([
        {type: 'list',
        name: 'employeeID',
        choices: employees,
        message: 'Which employee are you updating?'
    },
    {
        type: 'list',
        name: 'roleID',
        choices: roles,
        message: 'What is their new role?'
    }
    ]).then(async data =>{
        await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.employeeID, data.roleID])
        console.log('Employee role updated')
        menu()
    })
}