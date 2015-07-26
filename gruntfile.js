'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 4 versions']
        },
        files: {
          '.temp/flextheme.autoprefixer.css': '.temp/flextheme.sass.css'
        }
      }
    },
    clean: {
      build: ['.temp'],
      production: ['.temp', 'dist']
    },
    copy: {
      build: {
        cwd: '.temp/',
        dest: 'dist/',
        expand: true,
        src: 'flextheme.css',
      }
    },
    csscomb: {
      build: {
        files: {
          '.temp/flextheme.css': '.temp/flextheme.autoprefixer.css'
        }
      }
    },
    csslint: {
      build: {
        src: ['dist/flextheme.css']
      },
      sass: {
        src: ['.temp/flextheme.sass.css']
      }
    },
    cssmin: {
      build: {
        files: [{
          cwd: 'dist/',
          dest: 'dist/',
          expand: true,
          ext: '.min.css',
          src: ['*.css', '!*.min.css']
        }]
      }
    },
    sass: {
      build: {
        options: {
          indentType: 'space',
          indentWidth: 2,
          outputStyle: 'expanded'
        },
        files: {
          '.temp/flextheme.sass.css': 'styles/flextheme.scss'
        }
      }
    },
    watch: {
      build: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:build', 'csslint:sass']
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'sass:build',
    'autoprefixer:build',
    'csscomb:build',
    'copy:build',
    'cssmin:build',
    'csslint:build',
  ]);

  grunt.registerTask('default', function() {
    grunt.log.writeln();
    grunt.log.writeln('  Usage:');
    grunt.log.writeln();
    grunt.log.writeln('    grunt build');
    grunt.log.writeln('    grunt watch');
    grunt.log.writeln();
  });
};
