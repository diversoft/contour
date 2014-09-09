module.exports = (grunt) ->

    pkg = grunt.file.readJSON 'package.json'

    grunt.initConfig
        coffee:
            compile:
                files:
                    'dest/contour.js': ['src/contour.coffee']
                    'dest/test-contour.js': ['test/test-contour.coffee']

    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.registerTask 'default', 'coffee'