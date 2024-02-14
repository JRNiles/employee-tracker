const db = require("./db"); // Import the database pool

// Function to retrieve all departments
async function getAllDepartments() {
  try {
    const [rows, fields] = await db.query("SELECT * FROM department");
    return rows;
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error;
  }
}

// Function to retrieve all roles
async function getAllRoles() {
  try {
    const [rows, fields] = await db.query("SELECT * FROM role");
    return rows;
  } catch (error) {
    console.error("Error retrieving roles:", error);
    throw error;
  }
}

// Function to retrieve all employees
async function getAllEmployees() {
  try {
    const [rows, fields] = await db.query("SELECT * FROM employee");
    return rows;
  } catch (error) {
    console.error("Error retrieving employees:", error);
    throw error;
  }
}

// Function to add a department
async function addDepartment(departmentName) {
  try {
    await db.query("INSERT INTO department (name) VALUES (?)", [
      departmentName,
    ]);
    console.log("Department added successfully!");
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
}

// Function to add a role
async function addRole(title, salary, departmentId) {
  try {
    await db.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId]
    );
    console.log("Role added successfully!");
  } catch (error) {
    console.error("Error adding role:", error);
    throw error;
  }
}

// Function to add an employee
async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    await db.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
    console.log("Employee added successfully!");
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
}

// Function to update an employee's role
async function updateEmployeeRole(employeeId, roleId) {
  try {
    await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      roleId,
      employeeId,
    ]);
    console.log("Employee role updated successfully!");
  } catch (error) {
    console.error("Error updating employee role:", error);
    throw error;
  }
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
