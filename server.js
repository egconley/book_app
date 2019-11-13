'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.set('view engine', 'ejs');

app.get('/', getBooks);


function getBooks(req, res) {
  let SQL = 'SELECT * FROM books;';

  return client.query(SQL)
    .then(results => res.render('pages/index', { results: results.rows[0] }))
    .catch(() => {
      res.render('pages/error');
    })
  // res.render('pages/index');
}

app.post('/searches', searchHandler);

// app.get('/searches', (request, res) => {
//   console.log('!!!!!', bookArr);
//   // res.render('searches', { arrItems: bookArr });
// })

let bookArr = [];

function Book(info) {
  // const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  let id = info.id;
  this.title = info.volumeInfo.title || 'No title available';
  this.author = info.volumeInfo.authors || 'No author available';
  this.description = info.volumeInfo.description || 'No description available';
  // this.image = volumeInfo.imageLinks.thumbnail;
  this.image = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
  // link grabbed from items.volumeInfo.imageLinks.thumbnail property.
  bookArr.push(this);
  console.log(bookArr);
}

function searchHandler(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  // console.log(req.body);
  // console.log(req.body.search);

  if (req.body.search[1] === 'title') { url += `+intitle:${req.body.search[0]}`; }
  if (req.body.search[1] === 'author') { url += `+inauthor:${req.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(bookArr => res.render('pages/searches/show', { arrItems: bookArr }))
    .catch(() => {
      res.render('pages/error');
    })

  // how will we handle errors?
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


