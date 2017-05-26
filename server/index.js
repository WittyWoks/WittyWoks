// ------Default Login Server EJS STUFF---------
// 'use strict';
// const app = require('./app');
// const db = require('../db');
// const PORT = process.env.port || 3000;

// app.listen(PORT, () => {
//   console.log('Example app listening on port 3000!');
// });


// ----- Basic Server For React-----
'use strict';
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 3000;

app.use(express.static(__dirname + '/../public/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`BestFit is listening on port ${PORT}!`);
});
