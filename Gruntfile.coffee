module.exports = (grunt) ->

    pkg = grunt.file.readJSON 'package.json'

    grunt.initConfig
        watch:
            coffee:
                files: ['src/**/*.coffee']
                tasks: ['coffee']

        coffee:
            files:
                expand: true
                cwd: "src/"
                src: ["**/*.coffee"]
                dest: "dest/"
                ext: ".js"

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.registerTask 'default', ['coffee', 'watch']