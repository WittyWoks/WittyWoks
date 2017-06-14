'use strict';
const express = require('express');
const router = express.Router();
const pdfParser = require('../pdfparse.js'); // BB ADDED
const ResumeController = require('../controllers').Resume;
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const PersonalityTextSummaries = require('personality-text-summary');
const IBM_PERSONALITY_USER = process.env.IBM_PERSONALITY_USER || require('../../config/development.json').IBM.IBM_PERSONALITY_USER;
const IBM_PERSONALITY_PASS = process.env.IBM_PERSONALITY_PASS || require('../../config/development.json').IBM.IBM_PERSONALITY_PASS;
const IBM_TONE_USER = process.env.IBM_TONE_USER || require('../../config/development.json').IBM.IBM_TONE_USER;
const IBM_TONE_PASS = process.env.IBM_TONE_PASS || require('../../config/development.json').IBM.IBM_TONE_PASS;

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
    let payload = {
      personality: {
        main: null,
        summary: null
      },
      tone: {
        main: null
      }
    };

    pdfParser.pdfToText(pdfUrl, (rawText) => {
      // console.log(rawText);
      // Watson init
      let personality_insights = new PersonalityInsightsV3({
        username: IBM_PERSONALITY_USER,
        password: IBM_PERSONALITY_PASS,
        version_date: '2017-05-26'
      });

      let tone_analyzer = new ToneAnalyzerV3({
        username: IBM_TONE_USER,
        password: IBM_TONE_PASS,
        version_date: '2017-05-26'
      });

      // Watson send text
      // personality_insights.profile({
      //   text: rawText,
      //   consumption_preferences: true
      // },
      // function (err, response) {
      //   if (err) {
      //     console.log('error:', err);
      //   } else {
      //     personalitySummary = v3EnglishTextSummaries.getSummary(response);
      //     payload.personality.main = response;
      //     payload.personality.summary = personalitySummary;
      //   }
      // });

      let params = {
        text: rawText,
        tones: 'emotion, language, social',
        sentences: false
      };

      // tone_analyzer.tone(params, function(error, response) {
      //   if (error) {
      //     console.log('error:', error);
      //   } else {
      //     payload.tone.main = response;
      //     res.json(payload);
      //   }
      // });
      
    });

  });

module.exports = router;


