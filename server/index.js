'use strict';
const app = require('./app');
const db = require('../db');
const path = require('path');
const PORT = process.env.PORT || 3000;
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://adecthmzqqxcep:903992ed3f10951126eb761b5d9b08197c9adb0316b855f7d8066aa5631bacbf@ec2-54-163-253-94.compute-1.amazonaws.com:5432/d2ms3id7tgktug?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory';

const client = new pg.Client({
  database: process.env.DATABASE_DB || require('../config/development.json').postgresql.DATABASE_DB,
  user: process.env.DATABASE_USER || require('../config/development.json').postgresql.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD || require('../config/development.json').postgresql.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST || require('../config/development.json').postgresql.DATABASE_HOST,
  port: 5432,
  ssl: true,
  url: process.env.DATABASE_URL || require('../config/development.json').postgresql.DATABASE_URL
});

client.connect();



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
