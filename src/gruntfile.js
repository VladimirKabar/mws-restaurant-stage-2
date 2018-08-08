module.exports = function (grunt) {

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    sizes: [{
                        name: 'large',
                        rename: false,
                        width: 800,
                        quality: 50
                    },
                    {
                        name: 'medium',
                        rename: false,
                        width: 500,
                        quality: 50

                    }, {
                        name: 'small',
                        rename: false,
                        width: 250,
                        quality: 50
                    }
                    ]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'img/',
                    custom_dest: 'img/{%= name %}/'
                }]
            }
        }
    });
    var cwd = process.cwd();
    process.chdir("../");
    grunt.loadNpmTasks('grunt-responsive-images');
    process.chdir(cwd);
    grunt.registerTask('default', ['responsive_images']);
};
