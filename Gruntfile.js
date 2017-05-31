const config = require('config')['knex'];


// if (process.env.DATABASE_URL) {
//   const url = process.env.DATABASE_URL;
//   const name = process.env.DATABASE_DB;
// } else {
//   const url = require('./config/development.json').postgresql.DATABASE_URL;
//   const name = require('./config/development.json').postgresql.DATABASE_DB;
// }

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'client/**/*.js', 'db/**/*.js', 'server/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/test/**/*.js']
      }
    },

    pgcreatedb: {
      default: {
        connection: {
          url: "postgres://dciguifphqlpec:2448fb280f27d215544c2845eaa58e3c07ca19967aa06dc8cd2c6fe61273550a@ec2-174-129-224-33.compute-1.amazonaws.com:5432/dd7hrl5p7gm49v"
        },
        name: 'dd7hrl5p7gm49v'
      },
      staging: {
        connection: {
          url: config.connection.url,
        },
        name: config.connection.database,
      },
      production: {
        connection: {
          url: config.connection.url,
        },
        name: config.connection.database,
      },


    }



  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
