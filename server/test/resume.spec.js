'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../app.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Resume API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('accepts POST requests to /fileUpload', function (done) {
    request(app)
      .post('/fileUpload')
      .expect(res => {
        res.body = {
          length: res.body.length
        };
      })
      .expect(200, {
        length: 1
      })
      .end(done);
  });

  it('sends 404 if id on GET requests to /fileUpload does not exist', function (done) {
    request(app)
      .post('/fileUpload')
      .expect(404)
      .end(done);
  });

  // it('accepts POST requests to /fileUpload', function () {
  //   let profile = {
  //     first: 'James',
  //     last: 'Davenport',
  //     display: 'James Davenport',
  //     email: 'example@email.com',
  //     phone: '415-555-1234'
  //   };

  //   let pdfUrl = 'https://s3-us-west-1.amazonaws.com/resumeswittywoks/1-JonEricEscobedoResume.pdf';

  //   return request(app)
  //     .post('/api/profiles/1')
  //     .send(profile)
  //     .expect(201)
  //     .then(() => {
  //       return request(app)
  //         .get('/api/profiles/1')
  //         .expect(res => {
  //           res.body = {
  //             first: res.body.first,
  //             last: res.body.last,
  //             display: res.body.display,
  //             email: res.body.email,
  //             phone: res.body.phone
  //           };
  //         })
  //         .expect(200, profile);
  //     });
  // });

  // it('sends 404 if id on PUT requests to /api/profiles/:id does not exist', function (done) {
  //   request(app)
  //     .put('/api/profiles/123')
  //     .expect(404)
  //     .end(done);
  // });

});
