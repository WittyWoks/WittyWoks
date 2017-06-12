let Hash = require('../db/models/hash.js');


let HashTable = function() {
  this.limit = 100;
  this.storage = [];
};

let getIndexForKey = function(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; 
    hash = Math.abs(hash);
  }
  return hash % max;
};


HashTable.prototype.insert = function(key, value) {
  let index = getIndexForKey(key, 100);

  let bucket = this.storage[index] || [];
  for (let i = 0; i < bucket.length; i++ ) {
    let tuple = bucket[i];
    if (tuple[0] === key) {
      let oldValue = tuple[1];
      tuple[1] = value;
      return oldValue;
    }
  }

  bucket.push([key, value]);
  this.storage[index] = bucket;
  return undefined;
};

HashTable.prototype.retrieve = function(key) {
  let index = getIndexForKey(key, 100);
  let bucket = this.storage[index] || [];

  for (let i = 0; i < bucket.length; i++) {
    let tuple = bucket[i];
    if (tuple[0] === key) {
      return tuple[1];
    }
  }

  return undefined;
};

new Hash({})
  .fetch()
  .then(table => {
    if (!table) {
      let skills = 'algorithm, algorithms, angular, angular.js, angularjs, backbone, backbone, backbone.js, bluebird, bluebird.js, bookshelf, bootstrap, c#, c++, chai, css, css3, css4, d3, digital ocean, digitalOcean, docker, eclipse, es5, es6, express, express.js, git, grunt, gulp, heroku, highcharts, html, html5, jasmine, java, javascript, jekyll, jquery, knex, material ui, material-ui, mocha, mongo, mongodb, mongoose, mysql, node, node.js, passport, postgres, postgresql, python, python, react, react native, react router, react-native, react-router, react.js, redux, rest, ruby, sass, sequelize, socket, socket.io, sql, sqlite, underscore, underscore.js';

      let hashtable = new HashTable();

      skills.split(', ').forEach(skill => {
        hashtable.insert(skill, true);
      });

      let skillsString = JSON.stringify(hashtable.storage);

      Hash.forge({
        table: skillsString
      }).save()
      .then(() => {
        console.log('inserted');
      })
      .catch(err => {
        console.log(err);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

module.exports.HashTable = HashTable;
module.exports.getIndexForKey = getIndexForKey;
