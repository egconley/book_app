'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('pages/index');
})

app.post('/searches', searchHandler);

// app.get('/searches', (request, response) => {
//   console.log('!!!!!', bookArr);
//   // response.render('searches', { arrItems: bookArr });
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

function searchHandler(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  // console.log(request.body);
  // console.log(request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(bookArr => response.render('pages/searches/show', {arrItems: bookArr}))
    .catch(() => {
      response.render('pages/error');
    })
  // how will we handle errors?
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


