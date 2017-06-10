'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;
const models = require('../../db/models');

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
    console.log(req.user.id);
    console.log('here!!!');


    models.appliedJobs.where({'user_id' : req.user.id}).fetch()
      .then((data) => {
        if (!data) {
          throw data;
        }
        console.log('here',data);
      })


  });
