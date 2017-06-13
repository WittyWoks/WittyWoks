'use strict';
const express = require('express');
const router = express.Router();
const jobsController = require('../controllers').jobs;
const Crawler = require("js-crawler");


router.route('/jobMatchRanking')
  .post((req,res) => {

    let keywords = req.body.skills;
    let keywordsLookUp = {};
    let info = 0;
    let url = req.body.data.url;
    let pageContent = '';
    let pageContentLength;

    console.log(keywords.length);
    keywords.forEach((index) => {
      keywordsLookUp[index] = 0;
    })





    new Crawler().configure({depth:1})
    .crawl(url, function onSuccess(page) {
      pageContent = page.content;
      pageContent = pageContent.toLowerCase();

      pageContentLength = pageContent.length;

      for (let k in keywordsLookUp) {

        let tempPage = pageContent.split(k).join('');
        let LengthDifference = pageContentLength - tempPage.length;
        let keywordLength = k.length;
        console.log(k);
        if (k === 'css' && LengthDifference > 20) {
          LengthDifference = 6;
        }

        if (k === 'javascript' && LengthDifference > 30) {
          LengthDifference = 25
        }
        let count = Math.floor(LengthDifference / keywordLength);

        keywordsLookUp[k] += count;
        info++;

        if (info === keywords.length) {
          res.end(JSON.stringify(keywordsLookUp));
        }
      }
    });
  });






module.exports = router;
