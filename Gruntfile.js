const config = require('config')['knex'];


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
          url: require('./config/development.json').postgresql.DATABASE_URL || process.env.DATABASE_URL
        },
        name: require('./config/development.json').postgresql.DATABASE_DB || process.env.DATABASE_DB
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
    },

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-pg');

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('test', ['mochaTest']);
};
