const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database');
const parseString = require('xml2js').parseString;
const { xml } = require('../database/sample-data/sample.js')

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
  parseString(xml, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result.GoodreadsResponse.search[0].results[0].work);
      // Author [index].best_book[0].author[0].name[0]
      // Title [index].best_book[0].title[0]
      // Publish Year [index].original_publication_year[0]._
    }
  });
})

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
