/*global
module,
require
*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var client = grunt.option('client');
    var basePath;

    if( !client ){
        grunt.fail.fatal('no client set');
    }

    switch( client ) {

        case 'acuraadmin':
            basePath = '../GlassFishacuraperformance/acuraadmin/src/webroot/v2/';
            break;
        case 'acnmadmin':
            basePath = '../GlassFishACNM/acnmadmin/src/webroot/v2/';
            break;
        case 'candiadmin':
            basePath = '../GlassFishNissan/candiadmin/src/webroot/v2/';
            break;
        case 'client':
            basePath = '../client/';
            break;

    }

    if( !basePath ){
        grunt.fail.fatal('no basePath set');
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dist: {
                src: 'fonts/*.woff',
                dest: '../client/'
            }
        },
        svgstore: {
            options: {
                prefix : 'icon-' // This will prefix each ID
            },
            default : {
                files: {
                    'svg/defs.svg': ['svg/symbols/*.svg'],
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'ADF.templates',
                    processName: function(filePath) {
                        var tmpltName = filePath.replace(/^.*[\\\/]/, '').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                            tmpltName = tmpltName.substr(0, tmpltName.lastIndexOf('.'));
                        return tmpltName;
                    }
                },
                files: {
                    'grunt-work/hbsTemplates.js': ['tpl/*.hbs']
                }
            }
        },
        concat: {
            dev: {
                src: [
                    'js/dev/adf.config.js',
                    'js/dev/adf.utils.js',
                    'js/dev/adf.app.js',
                    'js/dev/adf.region.js',
                    'js/dev/adf.region.*.js',
                    'js/dev/adf.model.*.js',
                    'js/dev/adf.collection.*.js',
                    'js/dev/adf.view.dropdown-menu.js',
                    'js/dev/adf.view.cell.js',
                    'js/dev/adf.view.column-select-item.js',
                    'js/dev/adf.view.column-select.js',
                    'js/dev/adf.view.field.js',
                    'js/dev/adf.view.form.js',
                    // has to be before grid
                    'js/dev/adf.view.record.js',
                    'js/dev/adf.view.grid.js',
                    'js/dev/adf.view.header.js',
                    'js/dev/adf.view.headers.js',
                    'js/dev/adf.view.page.js',
                    'js/dev/common.js'
                ],
                dest: basePath+'js/adf.min.js',
            },
            lib: {
                src: [
                    'js/lib/jquery-*.min.js',
                    'js/lib/underscore.js',
                    'js/lib/backbone.js',
                    'js/lib/backbone.super.js',
                    'js/lib/backbone.wreqr.js',
                    'js/lib/backbone.babysitter.js',
                    'js/lib/backbone.marionette.js',
                    'js/lib/handlebars.min.js',
                    'js/lib/select2.js',
                    'js/lib/spin.js'
                ],
                dest: basePath+'js/lib.min.js',
            },
            plugins: {
                src: [
                    'js/plugins/*.js'
                ],
                dest: basePath+'js/plugins.min.js',
            },
        },
        uglify: {
            options: {
                // mangle: false
            },
            templates: {
                files: [
                    {dest: basePath+'js/hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'grunt-work/compiled.css': 'scss/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            dist: {
                files: [
                    {
                        src: 'grunt-work/compiled.css',
                        dest: basePath+'css/main.css'
                    }
                ]
            },
        },
        watch: {
            scriptsDev: {
                files: ['js/dev/*.js'],
                tasks: ['scripts-dev']
            },
            scriptsLib: {
                files: ['js/lib/*.js'],
                tasks: ['scripts-lib']
            },
            scriptsPlugins: {
                files: ['js/plugins/*.js'],
                tasks: ['scripts-plugins']
            },
            scss: {
                files: ['scss/partials/*.scss','scss/*.scss'],
                tasks: ['css']
            },
            hbs: {
                files: ['tpl/*.hbs'],
                tasks: ['hbs']
            },
            svg: {
                files: ['svg/symbols/*.svg'],
                tasks: ['svg']
            }
        }
    });

    grunt.registerTask('default', ['copy','concat','sass:dist','handlebars','uglify:templates','autoprefixer','svgstore','watch']);
    grunt.registerTask('hbs', ['handlebars','uglify:templates']);
    grunt.registerTask('css', ['sass:dist','autoprefixer']);
    grunt.registerTask('svg', ['svgstore']);
    grunt.registerTask('scripts-dev', ['concat:dev']);
    grunt.registerTask('scripts-lib', ['concat:lib']);
    grunt.registerTask('scripts-plugins', ['concat:plugins']);

};