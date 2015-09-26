module.exports = function (grunt) {
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '80'
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        nodemon.on('restart', function () {
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 500);
                        });
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['nodemon:dev']);
};