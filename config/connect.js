const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connect.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

module.exports = connect;
