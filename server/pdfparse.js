const fs = require('fs');
const PDFParser = require('pdf2json');
const path = require('path');
const request = require('request');
const HashTable = require('./hashtable.js').HashTable;
let Hash = require('../db/models/hash.js');
let getIndexForKey = require('./hashtable.js').getIndexForKey;


let parsePDF = (fileName, callback) => {

  let hash = new HashTable(); 

  new Hash({})
    .fetch()
    .then(model => {
      hash.storage = JSON.parse(model.attributes.table);
    })
    .catch(err => {
      console.log(err);
    });

  let matchingSkills = [];

  let pdfParser = new PDFParser(this, 1);
  let pdfPipe = request({url: fileName, encoding: null}).pipe(pdfParser);

  pdfPipe.on('pdfParser_dataError', errData => console.error('ERROR!!!!!!!!!', errData.data));
  pdfPipe.on('pdfParser_dataReady', pdfData => {
    let pdf = (pdfPipe.getRawTextContent().replace(/[.]\s|[.][^\w]/g, ' '));
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
      if (hash.retrieve(word)) {
        if (!matchingSkills.includes(word)) {
          matchingSkills.push(word);
        }
      }
    });
    callback(matchingSkills);
  });
};

let pdfToText = (fileName, callback) => {
  let pdfParser = new PDFParser(this, 1);
  let pdfPipe = request({url: fileName, encoding: null}).pipe(pdfParser);

  pdfPipe.on('pdfParser_dataError', errData => console.error('ERROR!!!!!!!!!', errData.data));
  pdfPipe.on('pdfParser_dataReady', pdfData => {
    let rawText = pdfParser.getRawTextContent();
    callback(rawText);
  });

};

module.exports.parsePDF = parsePDF;
module.exports.pdfToText = pdfToText;

