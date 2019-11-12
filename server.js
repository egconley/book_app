'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.envPORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('pages/index');
})

<<<<<<< HEAD
app.post('/serches', searchHendler);

function Book(items) {
=======
app.post('/searches', searchHandler);

function Book(info) {
>>>>>>> ab4ce572ffd20ee36a824b97ad7c18800295d14d
  // const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  let id = info.id;
  this.title = info.volumeInfo.title || 'No title available';
  this.author = info.volumeInfo.authors || 'No author available';
  this.description = info.volumeInfo.description || 'No description available';
  // this.image = volumeInfo.imageLinks.thumbnail;
  this.image = `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
  // link grabbed from items.volumeInfo.imageLinks.thumbnail property.
}

<<<<<<< HEAD
function searchHendler(request, response) {
=======
function searchHandler(request, response) {
>>>>>>> ab4ce572ffd20ee36a824b97ad7c18800295d14d
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);
<<<<<<< HEAD

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }));
}
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
=======
>>>>>>> ab4ce572ffd20ee36a824b97ad7c18800295d14d

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult)))
    .then(results => response.render('pages/searches/show', {searchResults: results}));
  // how will we handle errors?
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


