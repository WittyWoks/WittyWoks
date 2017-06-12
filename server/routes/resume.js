'use strict';
const express = require('express');
const router = express.Router();
const pdfParser = require('../pdfparse.js'); // BB ADDED
const ResumeController = require('../controllers').Resume;
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const PersonalityTextSummaries = require('personality-text-summary');
const IBM_USER = process.env.IBM_USER || require('../../config/development.json').IBM.IBM_USER;
const IBM_PASS = process.env.IBM_PASS || require('../../config/development.json').IBM.IBM_PASS;

router.route('/fileUpload')
  .post((req, res) => {
    let pdfUrl = Object.keys(req.body)[0];
    let resumeObj = {};

    resumeObj.user_id = req.user.id;
    resumeObj.pdfUrl = pdfUrl;


    pdfParser.parsePDF(pdfUrl, (skills) => {
      resumeObj.skills = skills;
      ResumeController.addResume(resumeObj);
      res.json(skills);
    });
  });

router.route('/getResume')
  .get((req, res) => {
    ResumeController.getResume(req.query, res);
  });

router.route('/analyzeResume')
  .get((req, res) => {
    let pdfUrl = req.query.url;
    let v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });
    let personalitySummary = null;

    pdfParser.pdfToText(pdfUrl, (rawText) => {
      console.log(rawText);
      // Watson init
      let personality_insights = new PersonalityInsightsV3({
        username: IBM_USER,
        password: IBM_PASS,
        version_date: '2017-05-26'
      });

      // Watson send text
      personality_insights.profile({
        text: rawText,
        consumption_preferences: true
      },
      function (err, response) {
        if (err) {
          console.log('error:', err);
        } else {
          // console.log(JSON.stringify(response, null, 2));
          personalitySummary = v3EnglishTextSummaries.getSummary(response);
          response.summary = personalitySummary;
          res.json(response);
        }
      });

      // res.json(rawText);
    });

  });

module.exports = router;


