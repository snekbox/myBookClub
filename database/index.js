const mysql = require('mysql');
require("dotenv").config(); //required dotenv for access to environmental variables

const connection = mysql.createConnection({
  host: process.env.HOST || 'localhost',
  user: process.env.MASTER_USER || 'root',
  port: process.env.PORT || 3306,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
});

const selectAll = (callback) => {
  connection.query('SELECT * FROM items', (err, items) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;