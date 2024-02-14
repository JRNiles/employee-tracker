const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./db/dbOperations");

// Function to display main menu options
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      // Perform action based on user choice
      switch (answers.action) {
        case "View all departments":
          getAllDepartments()
            .then((departments) => {
              console.table(departments);
              mainMenu();
            })
            .catch(handleError);
          break;
        case "View all roles":
          getAllRoles()
            .then((roles) => {
              console.table(roles);
              mainMenu();
            })
            .catch(handleError);
          break;
        case "View all employees":
          getAllEmployees()
            .then((employees) => {
              console.table(employees);
              mainMenu();
            })
            .catch(handleError);
          break;
        case "Add a department":
          addDepartmentPrompt().then(addDepartmentAction).catch(handleError);
          break;
        case "Add a role":
          addRolePrompt().then(addRoleAction).catch(handleError);
          break;
        case "Add an employee":
          addEmployeePrompt().then(addEmployeeAction).catch(handleError);
          break;
        case "Update an employee role":
          updateEmployeeRolePrompt()
            .then(updateEmployeeRoleAction)
            .catch(handleError);
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
          break;
      }
    });
}

// Function to handle errors
function handleError(error) {
  console.error("An error occurred:", error.message || error);
  inquirer
    .prompt([
      {
        type: "list",
        name: "retry",
        message: "Do you want to retry or return to the main menu?",
        choices: ["Retry", "Main Menu"],
      },
    ])
    .then((answers) => {
      if (answers.retry === "Retry") {
        mainMenu();
      } else {
        mainMenu();
      }
    });
}

// Function to prompt for adding a department
function addDepartmentPrompt() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]);
}

// Function to add a department
function addDepartmentAction(answers) {
  return addDepartment(answers.name).then(() => mainMenu());
}

// Function to prompt for adding a role
function addRolePrompt() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "number",
      name: "salary",
      message: "Enter the salary for the role:",
    },
    {
      type: "number",
      name: "departmentId",
      message: "Enter the department ID for the role:",
    },
  ]);
}

// Function to add a role
function addRoleAction(answers) {
  return addRole(answers.title, answers.salary, answers.departmentId).then(() =>
    mainMenu()
  );
}

// Function to prompt for adding an employee
function addEmployeePrompt() {
  return inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the last name of the employee:",
    },
    {
      type: "number",
      name: "roleId",
      message: "Enter the role ID for the employee:",
    },
    {
      type: "number",
      name: "managerId",
      message: "Enter the manager ID for the employee (leave blank if none):",
      default: null,
    },
  ]);
}

// Function to add an employee
function addEmployeeAction(answers) {
  return addEmployee(
    answers.firstName,
    answers.lastName,
    answers.roleId,
    answers.managerId
  ).then(() => mainMenu());
}

// Function to prompt for updating an employee's role
function updateEmployeeRolePrompt() {
  return inquirer.prompt([
    {
      type: "number",
      name: "employeeId",
      message: "Enter the ID of the employee whose role you want to update:",
    },
    {
      type: "number",
      name: "roleId",
      message: "Enter the new role ID for the employee:",
    },
  ]);
}

// Function to update an employee's role
function updateEmployeeRoleAction(answers) {
  return updateEmployeeRole(answers.employeeId, answers.roleId).then(() =>
    mainMenu()
  );
}

// Main function to start the application
function startApp() {
  console.log("Welcome to the Employee Tracker!");
  mainMenu();
}

// Call the startApp function to begin
startApp();
