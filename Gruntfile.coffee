module.exports = (grunt) ->

    pkg = grunt.file.readJSON 'package.json'

    grunt.initConfig
        watch:
            coffee:
                files: ["src/**/*.coffee"]
                tasks: 'coffee:src'
            coffee_test:
                files: ["test/**/*.coffee"]
                tasks: 'coffee:test'
            options:
                livereload: true

        connect:
            use_defaults: {}

        coffee:
            src:
                files: [
                    expand: true
                    cwd: 'src/'
                    src: ["**/*.coffee"]
                    dest: "dest/"
                    ext: ".js"
                ]
            test:
                files: [
                    expand: true
                    cwd: 'test/'
                    src: ["**/*.coffee"]
                    dest: "dest/"
                    ext: ".js"
                ]

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.registerTask 'default', ['connect', 'coffee', 'watch']