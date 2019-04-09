// const mysql = require('mysql');
const Sequelize = require('sequelize');
require("dotenv").config(); //required dotenv for access to environmental variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.MASTER_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql',
})

const Model = Sequelize.Model;
class Group extends Model {}
Group.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'group'
  });
  

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// const connection = mysql.createConnection({
//   host: process.env.HOST || 'localhost',
//   user: process.env.MASTER_USER || 'root',
//   port: process.env.PORT || 3306,
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'test',
// });

// const selectAll = (callback) => {
//   connection.query('SELECT * FROM items', (err, items) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;