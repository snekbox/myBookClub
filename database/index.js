// const mysql = require('mysql');
const Sequelize = require('sequelize');
require('dotenv').config(); // required dotenv for access to environmental variables

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
  googleId: { type: Sequelize.STRING, allowNull: false,  },
  token: { type: Sequelize.STRING, allowNull: false,  },
}, {
  sequelize,
  modelName: 'user',
})  

class Book extends Model {}
Book.init({
  title: { type: Sequelize.STRING, allowNull: false, },
  author: { type: Sequelize.STRING, allowNull: false, },
  published: { type: Sequelize.STRING, allowNull: false, },
  isbn: {type: Sequelize.STRING, allowNull: true,},
  urlInfo: {type: Sequelize.STRING, underscored: true, },
  description: {type: Sequelize.TEXT},
  image: {type: Sequelize.TEXT},
}, {
  sequelize,
  modelName: 'book',
})

class Group extends Model {}
Group.init({
  name: { type: Sequelize.STRING, allowNull: false, },
  nextMeeting: {type: Sequelize.DATE},
  }, {
    sequelize,
    modelName: 'group',
  });
User.hasMany(Group);
Group.belongsTo(User);
class Comment extends Model {}
Comment.init({
  comment: { type: Sequelize.TEXT, allowNull: false, },
}, {
  sequelize,
  modelName: 'comment',
})

class Note extends Model {}
Note.init({
  page: { type: Sequelize.INTEGER, allowNull: false},
  note: { type: Sequelize.TEXT, allowNull: false}
}, {
  sequelize,
  modelName: 'note'
})
const UserGroup = sequelize.define('users_groups');
const UserBook = sequelize.define('users_books');
const BookGroup = sequelize.define('books_groups');
Group.hasMany(Comment);
User.hasMany(Comment);
Book.hasMany(Comment);
Comment.belongsTo(Group);
Comment.belongsTo(User);
Comment.belongsTo(Book);
User.hasMany(Note);
Book.hasMany(Note);
Note.belongsTo(User);
Note.belongsTo(Book);
Book.hasOne(Group);
Group.belongsTo(Book);
User.belongsToMany(Group, {through: 'users_groups' });
Group.belongsToMany(User, {through: 'users_groups' });
User.belongsToMany(Book, {through: 'users_books'});
Book.belongsToMany(User, {through: 'users_books'});
Group.belongsToMany(Book, {through: 'books_groups'});
Book.belongsToMany(Group, {through: 'books_groups'});
UserGroup.belongsTo(User);
UserGroup.belongsTo(Group);
User.hasMany(UserGroup);
Group.hasMany(UserGroup);
BookGroup.belongsTo(Book);
BookGroup.belongsTo(Group);
Book.hasMany(BookGroup);
Group.hasMany(BookGroup);
sequelize.sync();


module.exports = {
  User,
  Group,
  Book,
  Comment,
  Note,
  UserGroup,
  UserBook,
  BookGroup,
}