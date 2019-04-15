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

// app.post('/connect/google', passport.authenticate('google-token', {session: false}),
// function(req, res, next) {
//   if (!req.user) {
//       return res.send(401, 'User Not Authenticated');
//   }
//   req.auth = {
//       id: req.user.id
//   };

//   next();
// },generateToken, sendToken)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  deseralizeUser(id, function(err, user) {
    done(err, user);
  });
});

app.post('/connect', passport.authenticate('google-token'),
 function(req, res) {
  res.send(req.user);
});

// app.get('/connect', passport.authenticate('google-token'),
//   function(req, res) {
//     res.send(req.user);
//   }
// )
app.get('/', (req, res, next) => {
  res.send(req.user);
})

app.get('/login', (req, res, next) => {
  res.send('wdawdaw')
})

app.get('/connect/google', (req, res, next) => {
  res.send('wdawdaw')
})

app.get('/books/googleapi', (req, res)=>{
  const {query} = req.query
  axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
      'q': query,
      'country': 'US',
      'maxResults': 2,
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
      res.json(book); // sends book back, so book ID can be used for purpose of adding groups
    }).catch((err) => {
      console.error(err);
    });
});

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

app.patch('/groups/delete', (req, res) => {
  const { groupId } = req.body;
  deleteGroup(groupId)
  .then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.error(err);
  });
})

app.patch('/groups/removeUser', (req, res) => {
  const { userId, groupId } = req.body;
  removeUserFromGroup(userId, groupId)
  .then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.error(err);
  });
})

app.post('/groups', (req, res) => {
  const { userId, groupName, bookId } = req.body.data;
  return createNewGroup(userId, groupName, bookId)
    .then(group => {
      addUserToGroup(userId, group.id);
      return group;
    })
    .then(newGroup => {
      res.json(newGroup);
    })
    .catch(err => {
      console.error(err);
    });
});

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

app.post('groups/comments', (req, res)=>{
  console.log(req);
  //adds comment to specific group's comment section
  // addComment = (userId, groupId, bookId, comment)

  // .then(()=>{
    // getAllComments = (groupId, bookId) 
    res.json('wee');
  // })
  // .catch((err)=>{
  //   console.log(err, 'data was not added to group');
  //   res.send('sorry, unable to add comment to database! - server/index.js line 232')
  // })

  //returns all comments for rendering on group's page
})

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
});

app.listen(3000, () => {
  console.warn('listening on port 3000!');
});
