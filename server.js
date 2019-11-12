'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.envPORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index');
})

app.post('/serches', searchHendler);

function Book(items) {
  // const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.id = items.id;
  this.title = items.volumeInfo.title || 'No title available';
  this.author = items.volumeInfo.info.authors || 'No author available';
  this.description = items.volumeInfo.description || 'No description available';
  // this.image = items.volumeInfo.imageLinks.thumbnail;
  this.image = `https://books.google.com/books/content?id=${items.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
  // link grabbed from items.volumeInfo.imageLinks.thumbnail property.
}

function searchHendler(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);

  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }));
}
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

///



