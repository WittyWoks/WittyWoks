'use strict';
const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers').appliedJobs;


// router.route('/')
//   .get(appliedJobsController.getAll)
//   // .post(ProfileController.create)
//   ;
//
// router.route('/:id')
//   .get(appliedJobsController.getOne)
//   .put(appliedJobsController.update)
//   // .delete(ProfileController.deleteOne)
//   ;

module.exports = router;
