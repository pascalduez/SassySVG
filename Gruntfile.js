'use strict';

var config = {
  root: '.',
  base: 'test',
  scss: 'test/sass',
  css: 'test/css',
  img: 'test/img',
  src: 'stylesheets',
  dist: 'dist'
};

var banner = [
  '// <%= pkg.title %> – v<%= pkg.version %>',
  ' – <%= grunt.template.today("yyyy-mm-dd") %>\n',
  '// <%= pkg.homepage %>\n',
  '// License: <%= pkg.license.type %>\n\n'
].join('');


module.exports = function (grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern.
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', 'bootcamp'],
    scope: 'devDependencies'
  });

  // Time how long tasks take.
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    conf: config,

    shell: {
      sass: {
        command: function (target) {
          var command = [
            'bundle exec sass',
            '--style expanded',
            '--load-path',
            '<%= conf.root %>/' + config[target],
            '--load-path',
            '<%= conf.root %>/node_modules/bootcamp/dist',
            '--require',
            '<%= conf.root %>/lib/helpers.rb',
            '--update',
            '<%= conf.scss %>:<%= conf.css %>'
          ].join(' ');

          return grunt.template.process(command);
        }
      }
    },

    bootcamp: {
      test: {
        files: {
          src: ["<%= conf.css %>/specs.css"]
        }
      }
    },

    watch: {
      test: {
        files: ['<%= conf.scss %>/*.scss'],
        tasks: ['shell:sass:src', 'bootcamp']
      }
    },

    browserSync: {
      test: {
        bsFiles: {
          src: '<%= conf.css %>/*.css'
        },
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= conf.base %>'
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= conf.css %>',
          src: '{,*/}*.css',
          dest: '<%= conf.css %>'
        }]
      }
    },

    concat: {
      options: {
        banner: banner,
      },
      dist: {
        src: [
          // config
          '<%= conf.src %>/config/_config.scss',
          // helpers
          '<%= conf.src %>/helpers/_functions.scss',
          '<%= conf.src %>/helpers/_svg.scss',
          // svg
          '<%= conf.src %>/svg/_svg.scss'
        ],
        dest: '<%= conf.dist %>/_<%= pkg.title %>.scss',
      },
    },

    copy: {
      www: {
        files: [
          {
            expand: true,
            src: ['docs/**'],
            dest: 'www/'
          },
          {
            expand: true,
            cwd: 'test/',
            src: ['index.html', 'img/**/*', 'css/*'],
            dest: 'www/test'
          }
        ]
      }
    },

    clean: {
      rebuild: {
        src: [
          'node_modules',
          'ruby',
          'Gemfile.lock',
          '.sass-cache',
          '.bundle'
        ]
      },
      www: {
        src: ['www']
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'master'
      }
    },

    'gh-pages': {
      options: {
        base: 'www',
        message: 'Update gh-pages',
        push: true
      },
      src: ['**']
    },

    sassdoc: {
      default: {
        src: 'stylesheets',
        dest: 'docs',
        options: {
          verbose: true,
          display: {
            access: ['public'],
            alias: false,
            watermark: true
          },
          package: '<%= pkg %>'
        }
      }
    }

  });

  grunt.registerTask('www', [
    'sassdoc',
    'copy:www',
    'gh-pages',
    'clean:www'
  ]);

  grunt.registerTask('test', [
    'browserSync:test',
    'watch:test'
  ]);

  grunt.registerTask('dist', [
    'concat:dist',
    'shell:sass:dist'
  ]);

  grunt.registerTask('release', [
    "bump-only",
    "dist",
    "bump-commit"
  ]);

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

};
