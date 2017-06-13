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
          url: "postgres://zoczpxqqxhgzik:6b090316713e6233265128b3156db8d1ec909a88169e2ea74432979bca04ee05@ec2-107-21-108-204.compute-1.amazonaws.com:5432/defj5ol4mk2p36?ssl=true&amp;sslfactory=org.postgresql.ssl.NonValidatingFactory"
        },
        name: 'defj5ol4mk2p36'
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
