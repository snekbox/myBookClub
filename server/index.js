/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const passport = require('passport');
require('./utils/passport')();
const cookieParser = require('cookie-parser');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config')
const db = require('../database');
const session = require("express-session");
const { json } = require('../database/sample-data/sample.js');
const { generateToken, sendToken } = require ('./utils/utils2/token.utils')
const {
  verifyUser,
  createNewGroup,
  getUserGroups,
  addOrFindBook,
  getOwnerGroups,
  addUserToGroup,
  getGroupUsers,
  addBookToGroup,
  getGroupBooks,
  addComment,
  getAllComments,
  searchGroups,
  googleBooksApiData,
  deleteGroup,
  removeUserFromGroup,
  deseralizeUser,
} = require('../database/helpers')



const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};
app.use(cors(corsOption));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "cats" }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Serializes the user by id to encode a token
 */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

/**
 * Deserializes the user by id to decode token
 */

passport.deserializeUser(function(id, done) {
  deseralizeUser(id, function(err, user) {
    done(err, user);
  });
});

/**
 * 
 */

app.post('/connect', passport.authenticate('google-token'),
  function(req, res) {
  let user = req.user
  req.session.destroy(function (err) {
    res.send(user);
  });  
});

/**
 * Queries the google books API and returns a promise which resolves to an array of book objects.
 */

app.get('/books/googleapi', (req, res)=>{
  const {query} = req.query
  axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
      'q': query,
      'country': 'US',
      'maxResults': 2, // Increase this to get more results. Keep it low for testing to limit API calls
    },
    headers:{
      'key': process.env.GOOGLE_BOOKS_API_KEY,
    }
  })
  .then((searchResults)=>{
    // send back searchResults to client, so they can choose a book.
    res.json(searchResults.data.items);
    // chosen book, will be sent via the body of a post request to the server
    // and stored in database
  })
  .catch((err)=>{
    res.json(err);
  })
})

/**
 * Sends the parsed book data, formatted to schema specs, to the database to be stored in Books model
 * instead of wasting API calls.
 */
  
app.post('/books/googleapi', (req, res) => {
  const {
    isbn,
    title,
    author,
    published,
    description,
    urlInfo,
    image,
  } = req.body.query;
  addOrFindBook(isbn, title, author, published, description, urlInfo, image)
    .then((book) => {
      res.json(book[0]); // sends book back, so book ID can be used for purpose of adding groups
    }).catch((err) => {
      console.error(err);
    });
});

/**
 * Queries the database for all users which belong to a group. Returns a promise that resolves to an array.
 */

app.get('/users', (req, res) => {
  const { groupId } = req.query;
  getGroupUsers(groupId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Queries the database for all groups to which a user belongs. Returns a promise that resolves to an array.
 */

app.get('/groups', (req, res) => {
  const { userId } = req.query;
  getUserGroups(userId)
    .then(groups => {
      res.json(groups);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Queries the database for all groups which contain the query in their name. Returns a promise that resolves to an array.
 */

app.get('/groups/search', (req, res) => {
  const { query } = req.query;
  searchGroups(query)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Updates a group in database to add a user.
 */

app.patch('/groups', (req, res) => {
  const { userId, groupId } = req.body;
  addUserToGroup(userId, groupId)
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Deletes a group from the database. Also deletes all references to that group in join tables.
 */

app.patch('/groups/delete', (req, res) => {
  const { groupId } = req.body;
  deleteGroup(groupId)
  .then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.error(err);
  });
})

/**
 * Supposed to remove a user from a group. Doesn't work. TODO.
 */

app.patch('/groups/removeUser', (req, res) => {
  const { userId, groupId } = req.body;
  removeUserFromGroup(userId, groupId)
  .then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.error(err);
  });
})

/**
 * Creates a new group in the database. Returns a promise that resolves to a group object.
 */

app.post('/groups', (req, res) => {
  const { userId, groupName, bookId } = req.body.data;
  return createNewGroup(userId, groupName, bookId)
    .then(group => {
      addUserToGroup(userId, group.id);
      return group;
    })
    .then(group => {
      addBookToGroup(group.id, bookId);
      return group;
    })
    .then(newGroup => {
      res.json(newGroup);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Adds a book from the database to an existing group. Returns a promise that resolves to a group object.
 */

app.patch('/groups/book', (req, res) => {
  const { groupId, bookId } = req.body;
  return addBookToGroup(groupId, bookId)
    .then(newGroup => {
      res.json(newGroup);
    })
    .catch(err => {
      console.error(err);
    });
})

/**
 * Creates a user in the database or returns the user associated with the current urse's email.
 * Returns a promise that resolves to a user object.
 */

app.post('/login', (req, res) => {
  console.log(req.body, 'post to login')
  const { email, givenName, familyName } = req.body.user;
  verifyUser(email, `${givenName} ${familyName}`)
    .then(response => {
      const userObj = response[0];
      res.send(userObj);
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * Adds a comment to a specific group on a specific book.
 * Returns a promise that resolves to an array of comment objects.
 */

app.post('/groups/comments', (req, res)=>{
  //adds comment to specific group's comment section
  const {commentText, userId, groupId, bookId} = req.body.query.comment;
  // addComment = (userId, groupId, bookId, comment)
    addComment(userId, groupId, bookId, commentText)
    .then(()=>{
      getAllComments(groupId, bookId)
      .then((allComments) =>{
        res.json(allComments);
      })
      .catch((err)=>{
        console.log(err, 'comments not retrieved from db');
      })
    })
    .catch((err)=>{
      console.log(err, 'comment not added to database, sorry')
    })
})

/**
 * Queries the database for all comments from a group. Returns a promise that resolves to an array of comment objects.
 */

app.get('/groups/comments', (req, res)=>{
  const {groupId, bookId} = req.query;
  getAllComments(groupId, bookId)
  .then((groupComments)=>{
    res.json(groupComments);
  })
  .catch((err)=>{
    console.log(err, 'error, db was unable to retrieve comments')
  })
})

/**
 * Used for testing. Returns sample Google book API data.
 */

app.get('/test', (req, res) => {
  res.json(googleBooksApiData); // sending back book data for book club creation test
  // See below for things to store in the database and their relative paths
  // Title:         json.items[i].volumeInfo.title
  // Authors:       json.items[i].volumeInfo.authors
  // Publish Year:  json.items[i].volumeInfo.publishedDate.slice(0,4)
  // Image:         json.items[i].volumeInfo.imageLinks.thumbnail
  // Info URL:      json.items[i].volumeInfo.infoLink
  // Description:   json.items[i].volumeInfo.description
  // ISBN:          json.items[i].volumeInfo.industryIdentifiers.filter(id => id.type === 'ISBN_13')[0].identifier
})

/**
 * Logs the current user out.
 */

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.listen(3000, () => {
  console.warn('listening on port 3000!');
});

