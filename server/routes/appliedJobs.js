'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;

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


router.route('/keyword')
  .get((req,res) => {
    console.log(req.user);
    console.log('here!!!');

    appliedJobs.get
    res.end('{python:200s}');


  });
