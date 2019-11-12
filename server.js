'use strict';

const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.listen(PORT, () => console.log(`Listening on ${PORT}`));