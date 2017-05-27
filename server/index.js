'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/companyInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});