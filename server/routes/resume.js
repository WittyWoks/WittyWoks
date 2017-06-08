'use strict';
const express = require('express');
const router = express.Router();
const pdfParser = require('../pdfparse.js'); // BB ADDED
const ResumeController = require('../controllers').Resume;

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

module.exports = router;


