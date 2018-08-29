module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist']
            }
        },
        concat: {
            options: {
                separator: ';',
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("h:MM:ss dd-mm-yyyy") %> */\n'                
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("h:MM:ss dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jasmine : {
            src : 'src/**/*.js',
            options : {
                specs : 'spec/**/*.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'jasmine']
        }
    });
  
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
  
    grunt.registerTask('test', ['jshint', 'jasmine']);
  
    grunt.registerTask('default', ['jshint', 'jasmine','clean', 'concat', 'uglify']);
    grunt.registerTask('build', ['clean:build', 'concat', 'uglify']);
  };