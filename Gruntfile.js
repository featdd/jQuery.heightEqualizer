'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'jQuery.heightEqualizer.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'jQuery.heightEqualizer.min.js': ['jQuery.heightEqualizer.js']
        }
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'uglify']);
};
