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


const displayData = (query, args, successMessage) => {
    db.query(query, args, (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.table(results);
        console.log(successMessage);
      }

      // starts prompts over again
      init();
    });
  };
  
  // gets all department data and executes display data making it viewable in console as a table
  const showDepartments = () => {
    displayData(`SELECT * FROM department`, [], "Department data retrieved successfully.");
  };
  
  // gets all roles data and executes display data making it viewable in console as a table
  const showRoles = () => {
    displayData(`SELECT * FROM roles`, [], "Role data retrieved successfully.");
  };
  
  // gets all employee data and executes display data making it viewable in console as a table
  const showEmployees = () => {
    displayData(`SELECT * FROM employee`, [], "Employee data retrieved successfully.");
  };
  
  // adding department prompts
  const addDepartment = () => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department you'd like to add?",
        name: "departmentName",
      },
    ]).then((ans) => {
      displayData(
        `INSERT INTO department(name) VALUES(?)`,
        [ans.departmentName],
        "Department added successfully."
      );
    });
  };
  
  // adding role prompts
  const addRole = () => {
    db.promise()
      .query(`SELECT id, name FROM department`)
      .then((rows) => {
        const deptChoices = rows[0].map(obj => obj.name);
        inquirer.prompt([
          {
            type: "input",
            message: "What is the title of the role you'd like to add?",
            name: "roleTitle",
          },
          {
            type: "input",
            message: "What is the salary for this role?",
            name: "roleSalary",
          },
          {
            type: "list",
            message: "Which department is this role in?",
            name: "department",
            choices: deptChoices,
          },
        ]).then((ans) => {
          const department = rows[0].find(d => d.name === ans.department);
          displayData(
            `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, ?)`,
            [ans.roleTitle, ans.roleSalary, department.id],
            "Role added successfully."
          );
        });
      });
  };
  
  // adding employee prompts
  const addEmployee = () => {
    inquirer.prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
    ]).then((ans) => {
      displayData(
        `INSERT INTO employee(first_name, last_name) VALUES(?, ?)`,
        [ans.firstName, ans.lastName],
        "Employee added successfully."
      );
    });
  };