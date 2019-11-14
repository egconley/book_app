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
app.get('/books/:book_id', getOneBook);
app.post('/searches', searchHandler);
app.get('/searches/new', newSearch);
// app.get('/add', showForm); // show form to add a task
app.post('/add', addBook); // create a new task


function getBooks(req, res) {
  let SQL = 'SELECT * FROM books;';
  return client.query(SQL)
    .then(results => res.render('pages/index', { results: results.rows }))
    .catch(() => {
      res.render('pages/error');
    })
  // res.render('pages/index');
}

function getOneBook(req, res) {
  let SQL = 'SELECT * FROM books WHERE id=$1;';
  let values = [req.params.book_id];

  return client.query(SQL, values)
    .then(result => {
      return res.render('pages/books/show', { book: result.rows[0] });
    })
    .catch(err => console.error(err));
}

function addBook(req, res) {
  // console.log('addBook()', req.body);
  let { author, title, description, isbn, image_url, bookshelf  } = req.body;
  let SQL = 'INSERT into books(author, title, description, isbn, image_url, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);';
  let values = [author, title, description, isbn, image_url, bookshelf ];

  return client.query(SQL, values)
    .then(res.redirect('/'))
    .catch(err => console.error(err));
}

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

function newSearch(req, res) {
  // renders the search form 'pages/searches/new'
  res.render('pages/searches/new');
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


