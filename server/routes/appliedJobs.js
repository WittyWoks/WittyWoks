'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;
const resumeController = require('../controllers').resume;
const models = require('../../db/models');
var Crawler = require("js-crawler");


router.route('/ReturnJobsApplied')
  .post((req, res) => {
    appliedJobsController.create(req.body);
  })
  .get(appliedJobsController.getAll)
  ;
  // .get((req, res) => {
  //   // console.log('INSIDE APPLIEDJOBS', req.user);
  //   appliedJobsController.getAll(req, res)
  //   // res.json('HALLO');
  // })
module.exports = router;


router.route('/urlParser')
  .post((req,res) => {

    let keywords = req.body.skills;
    let keywordsLookUp = {};

    keywords.forEach((index) => {
      keywordsLookUp[index] = 0;
    });

    req.body.data.forEach((index, count) => {

      let each = JSON.parse(index.job_data);
      let url = each['indeed']['url'];
      console.log(url);
      new Crawler().configure({depth: 1})
      .crawl(url, function onSuccess(page) {

        let pageContent = page.content;
        let pageContentLength = pageContent.length;
        pageContent = pageContent.toLowerCase();

        for (let k in keywordsLookUp) {
          
          let tempPage = pageContent.split(k).join('');
          let LengthDifference = pageContentLength - tempPage.length;
          let keywordLength = k.length;

          if (k === 'css' && LengthDifference > 20) {
            LengthDifference = 6;
          }

          if (k === 'javascript' && LengthDifference > 30) {
            LengthDifference = 25
          }

          let count = Math.floor(LengthDifference / keywordLength);
          keywordsLookUp[k] += count;
        }

        if (count === req.body.data.length-1) {
          console.log(keywordsLookUp);
          res.end(JSON.stringify(keywordsLookUp));
        }
      });
    });
  })
