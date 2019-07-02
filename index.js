var mysql = require('mysql3');

var con = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "Migueletes2423"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});