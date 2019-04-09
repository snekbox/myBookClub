// const mysql = require('mysql');
const Sequelize = require('sequelize');
require("dotenv").config(); //required dotenv for access to environmental variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.MASTER_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql',
})

const Model = Sequelize.Model;

class User extends Model {}
User.init({
  username: Sequelize.STRING,
  email: Sequelize.STRING
  
})  


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
