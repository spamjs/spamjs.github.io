/**
 * Description
 * @method exports
 * @param {} grunt
 * @return
 */
module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');
  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    uglify: {
      options: {
        mangle: true,
        //compress : false,
        //beautify : true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        options: {
          footer: ""
        },
        files: {
        }
      }
    },
    jsbeautifier: {
      files: ["src/**/*.js", "!src/external/components/**/*.js"],
      options: pkg.jsbeautifier
    },
    watch: {
      options: {
        livereload: {
          port: 8081
        }
      },
      csshtml: {
        files: ['dist/**/*.css']
      },
      jsFiles: {
        files: ["src/**/*.js", 'src/**/*.html']
      },
      jsonFiles: {
        files: ["src/**/module.json", "!src/external/components/**/module.json"],
        tasks: ['bootloader:scan:skip']
      }
    },
    jshint: {
      files: ["src/**/*.js", "!src/external/components//**/*.js"],
      options: {
        globals: {
          jQuery: true,
          define: true,
          module: true,
          _importStyle_: true,
          is: true,
          when: true
        }
      }
    },
    bootloader: {
      options: {
        indexBundles: ["webmodules/bootloader", "spamjs/bootconfig", "spamjs/app"],// ["project/app"],
        src: "./",
        dest: "dist",
        resourcesFile: "resource.json",
        livereloadUrl: "http://localhost:8081/livereload.js",
        bootServer: {
          port: 8080
        }
      }
    },
    webfont: {
      icons: {
        src: 'src/img/custom-icons/*.svg',
        dest: 'src/fonts/',
        destCss: 'src/fonts/style',
        options: {
          font: 'icons',
          stylesheet: 'scss',
          relativeFontPath: "../../src/fonts/",
          htmlDemo: false,
          hashes: true
        }
      }
    },
    'ftp-diff-deployer': {
      options: {
        host: '182.50.132.48',
        port: 21,
        auth: {
          username: 'cdn.hotiff.in',
          password: 'xgE00c^9'
        },
        diff: 'simple',
        exclude: ['/.idea', '/.idea/**/*', '/.git/**/*', '/**/.git/**', '/**/*.scss', '/node_modules/**/*', '/node_modules']
      },
      src: {
        options: {
          src: 'src',
          dest: '/src',
          memory: './memory.src.json'
        }
      },
      dist: {
        options: {
          src: 'dist',
          dest: '/dist',
          memory: './memory.dist.json'
        }
      },
      root: {
        options: {
          src: 'dist/root',
          dest: '/',
          memory: './memory.root.json'
        }
      }
    },
    cssmin: {
      options: {
        target: "unicommercechat/dist/style",
        advanced: true,
        keepSpecialComments: 0
      },
      target: {
        files: {
          'dist/style/library.css': [
            'src/external/components/webmodules-bootstrap/css/bootstrap.min.css',
            'src/external/components/jqmodules-x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bootloader');
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'webfont', 'cssmin']);

  // Custom task
  grunt.registerTask('start-cdn-server', ['bootloader:server', "watch"]);
  grunt.registerTask('scan', ['bootloader:scan:skip', 'cssmin']);
  grunt.registerTask('bundlify', ['bootloader:bundlify', 'cssmin']);
  grunt.registerTask('build', ['bundlify']);
  grunt.registerTask('check', ["jshint", 'jsbeautifier']);

  var CleanCSS = require('clean-css');
  var fs = require('fs')
  grunt.registerTask('cssfy', function () {
    var filePath = "./src/external/components/datetimepicker/jquery.datetimepicker.css";
    var cssData = fs.readFileSync(filePath, 'utf8');
    (new CleanCSS({target: "./dist/", relativeTo: filePath}))
      .minify(cssData, function (errors, minified) {
        grunt.file.write("./dist/some.css", minified.styles);
      });
  });


};