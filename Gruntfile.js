module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    karma: {
      unit: {
        options: {
          basePath: '',
          frameworks: ['jasmine'],
          files: ['src/*.js', 'test/*.spec.js'],
          reporters: ['progress'],
          port: 9999,
          colors: true,
          logLevel: 'INFO',
          autoWatch: true,
          browsers: ['PhantomJS'],
          singleRun: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('default', ['uglify']);
};
