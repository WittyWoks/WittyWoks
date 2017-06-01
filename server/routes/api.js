'use strict';
const express = require('express');
const router = express.Router();
const path = require('path'); // JC ADDED
const formidable = require('formidable'); // JEE ADDED
const fs = require('fs'); // JEE ADDED
const pdfParser = require('../pdfparse.js'); // BB ADDED

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/dashboard')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/home')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.route('/fileUpload')
  .post((req, res) => {
    // // create an incoming form object
    // var form = new formidable.IncomingForm();

    // // parse the incoming request containing the form data
    // form.parse(req);

    // let getSkills = new Promise((resolve, reject) => {
    //   let fileName;
      
    //   // store all uploads in the /uploads directory
    //   form.uploadDir = path.join(__dirname, '../../uploads');

    //   // every time a file has been uploaded successfully,
    //   // rename it to it's orignal name
    //   form.on('file', function(field, file) {
    //     fileName = file.name;
    //     fs.rename(file.path, path.join(form.uploadDir, file.name));

    //     // This is an async call - resolve once this function has completed!
    //     resolve(fileName);
    //   });

    //   // log any errors that occur
    //   form.on('error', function(err) {
    //     console.log('An error has occured: \n' + err);
    //   });
    // })
    // getSkills.then((fileName) => {
    //   pdfParser.parsePDF(fileName, function(skills) {
    //     res.json(skills);
    //   });
    // })
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // parse the incoming request containing the form data
    form.parse(req);
      
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../../uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name));
      pdfParser.parsePDF(file.name, function(skills) {
        res.json(skills);
      });
    });

    // log any errors that occur
    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });
    
    
  });

module.exports = router;
