// const mysql = require('mysql');
const Sequelize = require('sequelize');
require("dotenv").config(); //required dotenv for access to environmental variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.MASTER_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql',
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Model = Sequelize.Model;

class User extends Model {}
User.init({
  username: { type: Sequelize.STRING, allowNull: false,  },
  email: {type: Sequelize.STRING, allowNull: false, },
}, {
  sequelize,
  modelName: 'user',
})  

class Book extends Model {}
Book.init({
  title: { type: Sequelize.STRING, allowNull: false, },
  author: { type: Sequelize.STRING, allowNull: false, },
  published: { type: Sequelize.INTEGER(4), allowNull: false, },
  isbn: {type: Sequelize.INTEGER(13), allowNull: true,},
  urlInfo: {type: Sequelize.STRING, underscored: true, },
}, {
  sequelize,
  modelName: 'book',
})

class Group extends Model {}
Group.init({
  name: { type: Sequelize.STRING, allowNull: false, },
  }, {
    sequelize,
    modelName: 'group',
  });
User.hasMany(Group);
Group.belongsTo(User);
// Group.hasMany(User);
class Comment extends Model {}
Comment.init({
  comment: { type: Sequelize.TEXT, allowNull: false, },
}, {
  sequelize,
  modelName: 'comment',
})

class Note extends Model {}
Note.init({
  page: {type: Sequelize.INTEGER, allowNull: false},
  note: { type: Sequelize.TEXT, allowNull: false}
})
User.hasMany(Note);
Book.hasMany(Note);
Note.belongsTo(User);
Note.belongsTo(Book);
sequelize.sync()

// User.create({
//   username: 'quinnmccourt',
//   email:'quinnmccourt@gmail.com'
// }).then(results => {
//   Group.create({
//     name: `Quinn's Roughnecks`,
//     userId: results.dataValues.id
//   })
// })

Group.findAll({
  include: [{
    model: User
  }]
}).then((result) => {
  console.log(result);
}).catch((err) => {
  
});
