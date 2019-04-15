/* eslint-disable prettier/prettier */
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { json } = require('../database/sample-data/sample.js')
const { verifyUser,
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
} = require('../database/helpers')

const app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

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
  const { isbn, title, author, published, description, urlInfo, image } = req.body.query;
  addOrFindBook(isbn, title, author, published, description, urlInfo, image)
    .then((book) => {
      res.json(book); // sends book back, so book ID can be used for purpose of adding groups
    }).catch((err) => {
      console.error(err);
    });
})

app.get('/groups', (req, res) => {
  const { userId } = req.query;
  getUserGroups(userId)
    .then((groups) => {
      res.json(groups)
    }).catch((err) => {
      console.error(err);
    });
})

app.get('/groups/search', (req, res) => {
  const { query } = req.query;  
  searchGroups(query)
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      console.error(err);
    });
})

app.patch('/groups', (req, res) => {
  const { userId, groupId } = req.body;
  addUserToGroup(userId, groupId)
  .then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.error(err);
  });
})

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
    .then((group) => {
      addUserToGroup(userId, group.id)
      return group;
    }).then((newGroup) => {
      console.log(newGroup, 'new Group')
      res.json(newGroup);
    }).catch((err) => {
      console.error(err);
    });
})

app.post('/login', (req, res) => {
  const { email, givenName, familyName } = req.body.user;
  verifyUser(email, `${givenName} ${familyName}`)
    .then((response) => {
      const userObj = response[0];
      res.send(userObj);
    }).catch((err) => {
      console.error(err);
    });
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
})

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
