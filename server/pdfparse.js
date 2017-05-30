let fs = require('fs');
let PDFParser = require('pdf2json');

let technicalskills = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: []
};

let skills = `algorithm, algorithms, angular, angular.js, angularjs, backbone, backbone, backbone.js, bluebird, \
bluebird.js, bookshelf, bootstrap, c#, c++, chai, css, css3, css4, d3, digital ocean, digitalOcean, docker, eclipse, \
es5, es6, express, express.js, git, grunt, gulp, heroku, highcharts, html, html5, jasmine, java, javascript, jekyll, jquery, \
knex, material ui, material-ui, mocha, mongo, mongodb, mongoose, mysql, node, node.js, passport, postgres, postgresql, python, python, \
react, react native, react router, react-native, react-router, react.js, redux, rest, ruby, sass, sequelize, socket, socket.io, sql, \
sqlite, underscore, underscore.js`;


skills.split(', ').forEach(skill => {
  let firstLetter = skill[0];
  technicalskills[firstLetter].push(skill);
});

let matchingSkills = [];

let pdfParser = new PDFParser(this, 1);

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
  let pdf = (pdfParser.getRawTextContent().replace(/[.]\s|[.][^\w]/g, ' '));
  pdf = pdf.replace(/[^\w-\s.+#]/g, ' ');
  pdf = pdf.split(/\s/);
  let pdfNew = [];
  pdf.forEach(word => {
    if (!(word === '')) {
      pdfNew.push(word);
    }
  });
  
  pdfNew.forEach(word => {
    word = word.toLowerCase();
    let firstLetter = word[0];
    let skillsByLetter = technicalskills[firstLetter];
    if (skillsByLetter) {
      skillsByLetter.forEach(skill => {
        if (skill === word) {
          if (!matchingSkills.includes(skill)) {
            matchingSkills.push(skill);
              return;
          }
        }
      })
    }
  });
  console.log(matchingSkills);
});

pdfParser.loadPDF(/*insert pdf here*/);