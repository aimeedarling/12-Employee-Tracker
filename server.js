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
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employees manager', 'Quit']
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
        else if (data.mainMenu === 'Update an employees manager')
        updateEmployeeManager()
        else {db.close()}
    })
}
//calls menu function
menu()

async function viewAllDepartments(){
    const results = await db.query('SELECT * FROM department')
    console.table(results)
    menu()
}

async function viewAllRoles(){
    const results = await db.query('SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id')
    console.table(results)
    menu()
}

async function viewAllEmployees(){
    const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name 
                    AS "last name", role.title, department.department_name AS department, role.salary, 
                    concat(manager.first_name, " ", manager.last_name) AS manager
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee manager
                    ON manager.id = employee.manager_id`
    const results = await db.query(sql)
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

//!working 🤗
async function addRole(){
    const departments = await db.query('SELECT id AS value, department_name AS name FROM department')
    // const departments = await db.query('SELECT department_name as name FROM department')
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'list',
            name: 'department',
            choices: departments,
            message: 'What department?'
        }
    ]).then(async data => {
        await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [data.title, data.salary, data.department])
        console.log(`✅ ${data.title} added to roles!`)
        menu()
    })
}


async function addEmployee(){
    const roles = await db.query('SELECT id AS value, title AS name FROM role')
    const employees = await db.query('SELECT id AS value, CONCAT(first_name, " ", last_name) AS name from employee')
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is their last name?'
        },
        {
            type:'list',
            name: 'roleId',
            choices: roles,
            message: 'Please select their role.'
        },
        {
            type:'list',
            name: 'managerId',
            choices: employees,
            message: 'Please select the manager of the employee'
        }
    ]).then(async data => {
        await db.query('INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (?,?,?,?)', [data.first_name, data.last_name, data.roleId, data.managerId])

        console.log(`✅ ${data.first_name} ${data.last_name} added to employees!`)
        menu()
    })
}

async function updateEmployee(){
    const employees = await db.query('SELECT id AS value, concat(first_name, " ", last_name) AS name from employee');
    const roles = await db.query('SELECT id AS value, title as name FROM role');
    inquirer.prompt([
        {type: 'list',
        name: 'employeeId',
        choices: employees,
        message: 'Which employee are you updating?'
    },
    {
        type: 'list',
        name: 'roleId',
        choices: roles,
        message: 'What is their new role?'
    }
    ]).then(async data =>{
        await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.roleId, data.employeeId])
        console.log('✅ Employee role updated')
        menu()
    })
}

async function updateEmployeeManager(){
    const employees = await db.query('SELECT id AS value, concat(first_name, " ", last_name) AS name from employee')
    inquirer.prompt([
       { type: 'list',
       name: 'employee',
       choices: employees,
       message: 'Which employee would you like to assign a new manager?'
    },
    {
        type: 'list',
        name: 'manager',
        choices: employees,
        message: 'Who is their new manager?'
    }
    ]).then(async data =>{
        if (data.employee !== data.manager) {await db.query('UPDATE employee SET manager_id =? WHERE id =?', [data.manager, data.employee])
        console.log('✅ Employee manager updated')}
        else
        console.log (' ❌ You cannot assign employee to be their own manager')
        menu()
    })
}