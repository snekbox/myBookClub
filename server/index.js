const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');
const { json } = require('../database/sample-data/sample.js')

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

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
