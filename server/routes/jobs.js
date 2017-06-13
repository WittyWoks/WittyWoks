'use strict';
const express = require('express');
const router = express.Router();
const jobsController = require('../controllers').jobs;
const Crawler = require("js-crawler");


router.route('/jobMatchRanking')
  .post((req,res) => {

    console.log('in match',req.body);
    let keywords = req.body.skills;
    let keywordsLookUp = {};
    let info = 0;
    let url = req.body.data.url

    keywords.forEach((index) => {
      keywords[index] = 0;
    })


    new Crawler().configure({depth:1})
    .crawl(url, function onSuccess(page) {
      let pageContent = page.content;
      pageContent = pageContent.toLowerCase();

       

    })
  });






module.exports = router;
