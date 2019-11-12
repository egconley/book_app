'use strict';

const express = require('express');
const app = express();
const PORT = process.envPORT || 3000;



app.listen(PORT, () => console.log(`Listening on ${PORT}`));