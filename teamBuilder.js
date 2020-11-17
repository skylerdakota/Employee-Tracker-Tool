// Dependencies
// =============================================================
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// Sets up MySQL connection
// =============================================================
var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // Username
  user: "root",

  // Password
  password: "",
  database: "team_DB"
});

// Starts the server to begin listening
// =============================================================
connection.connect(function(err) {
  if (err) throw err;
  runPrompt();
});

// Main inquiry set for managing employees
// =============================================================
function runPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by department",
        "View all Employees by manager",
        "Add Employee",
        "Remove Emplpoyee",
        "Update Employee role",
        "Update Employee manager"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all Employees":
        employeeView();
        break;

      case "View all Employees by department":
        // multiSearch();
        break;

      case "View all Employees by manager":
        // rangeSearch();
        break;

      case "Add Employee":
        employeeAdd();
        break;

      case "Remove Emplpoyee":
        employeeSearch();
        break;

      case "Update Employee role":
        // songSearch();
        break;

      case "Update Employee manager":
        // songAndAlbumSearch();
        break;
      }
    });
}

// Inquiry for viewing all employees
// =============================================================
function employeeView() {
    .then(function(answer) {
          var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.department, role.salary";
            query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
            query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
          connection.query(query, { artist: answer.artist }, function(err, res) {
            for (var i = 0; i < res.length; i++)
    console.table([
        {
          id: res[i].id,
          first_name: res[i].first_name,
          last_name: res[i].last_name,
          title: res[i].title,
          department: res[i].department,
          salary: res[i].salary,
          manager: res[i].manager_id
        }, 
      ]);
    }

// Inquiry for removing an employee
// =============================================================
function employeeSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Which employee would you like to remove?",
      choices: [
        "option placeholder",
      ]
    })
    .then(function(answer) {
    //   var query = "SELECT position, song, year FROM top5000 WHERE ?";
    //   connection.query(query, { artist: answer.artist }, function(err, res) {
    //     for (var i = 0; i < res.length; i++) {
    //       console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
    //     }
        runSearch();
      });
    });
}

// Inquiry for adding an employee
// =============================================================
function employeeAdd() {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employee's last role?",
      }
      {
        name: "role",
        type: "input",
        message: "Who is the employee's manager?",
      }
    ])
    .then(function(answer) {
    //   var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
    //   connection.query(query, [answer.start, answer.end], function(err, res) {
    //     for (var i = 0; i < res.length; i++) {
    //       console.log(
    //         "Position: " +
    //           res[i].position +
    //           " || Song: " +
    //           res[i].song +
    //           " || Artist: " +
    //           res[i].artist +
    //           " || Year: " +
    //           res[i].year
    //       );
    //     }
        runPrompt();
      });
    });
}







function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runPrompt();
      });
    });
}

function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].artist);
      }
      runPrompt();
    });
  }

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runPrompt();
      });
    });
}
