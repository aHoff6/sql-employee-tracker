const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_database'
    },
    console.log(`Connected to the database.`)
);

// prompt menu and selection
const init = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Please select from the following options:",
                name: "begin",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Exit"
                ]
            }
        ]).then(ans => {
            switch (ans.begin) {
                case "View all departments": showDepartments();
                    break;
                case "View all roles": showRoles();
                    break;
                case "View all employees": showEmployees();
                    break;
                case "Add a department": addDepartment();
                    break;
                case "Add a role": addRole();
                    break;
                case "Add an employee": addEmployee();
                    break;
                case "Update an employee role": updateEmployee();
                    break;
                case "Exit":
                    console.log("Done");
                    process.exit();
            }
        }).catch(err => console.error(err));
}

init();

const showDepartments = () => {
     console.log("testing show department")
   
};

const showRoles = () => {
    console.log("testing show roles")
  
};

const showEmployees = () => {
    console.log("testing show employees")
  
};

