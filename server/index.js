'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 3000;

// // JC ADDED
// const pg = require('pg');
// // JC ADDED
// const client = new pg.Client({
//   database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
//   user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
//   port: 5432,
//   // ssl: true,
//   // url: process.env.DATABASE_URL +'ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory' || require('../config/development.json').postgresql.DATABASE_URL
// });

// // JC ADDED
// client.connect();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
