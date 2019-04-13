const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');
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
} = require('../database/helpers')

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/books', (req, res) => {
  const { isbn, title, author, published, description, urlInfo, image } = req.body;
  addOrFindBook(isbn, title, author, published, description, urlInfo, image)
    .then((book) => {
      res.json(book);
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

app.post('/groups', (req, res) => {
  const { userId, groupName, bookId } = req.body;
  createNewGroup(userId, groupName, bookId)
    .then((group) => {
      return addUserToGroup(userId, group.id);
    }).then((newGroup) => {
      res.send(newGroup);
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
  res.send(json.items);
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
