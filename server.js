'use strict';

const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index');
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
