/*global
module,
require
*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var client = grunt.option('client');
    var filePath;
    var relativePath;

    if( !client ){
        grunt.fail.fatal('no client set');
    }

    switch( client ) {

        case 'acuraadmin':
            filePath = '/Users/dehnel/cvsroot/client/auto/GlassFishacuraperformance/acuraadmin/src/webroot/v2/';
            relativePath = '../../acuraadmin-v2/';
            break;
        case 'acnmadmin':
            filePath = '/Users/dehnel/cvsroot/client/auto/GlassFishACNM/acnmadmin/src/webroot/v2/';
            relativePath = '../../acnmadmin-v2/';
            break;
        case 'candiadmin':
            filePath = '/Users/dehnel/cvsroot/client/auto/GlassFishNissan/candiadmin/src/webroot/v2/';
            relativePath = '../../candiadmin-v2/';
            break;
        case 'client':
            filePath = '../client/';
            relativePath = '../../client/';
            break;

    }

    if( !filePath ){
        grunt.fail.fatal('no filePath set');
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
                    // core
                    'js/dev/core/config.js',
                    'js/dev/core/utils.js',
                    'js/dev/core/app.js',
                    'js/dev/core/page.js',
                    // regions
                    'js/dev/regions/region.js',
                    'js/dev/regions/form.js',
                    'js/dev/regions/grid.js',
                    'js/dev/regions/overlay-grid.js',
                    // models
                    'js/dev/models/field.js',
                    'js/dev/models/record.js',
                    'js/dev/models/dropdown-menu.js',
                    'js/dev/models/action.js',
                    // collections
                    'js/dev/collections/*.js',
                    // views
                    'js/dev/views/dropdown-menu.js',
                    'js/dev/views/cell.js',
                    'js/dev/views/column-select-item.js',
                    'js/dev/views/column-select.js',
                    'js/dev/views/form-action.js',
                    'js/dev/views/field.js',
                    'js/dev/views/form.js',
                    'js/dev/views/record.js',                    // has to be before grid
                    'js/dev/views/grid.js',
                    'js/dev/views/header.js',
                    'js/dev/views/headers.js',
                    'js/dev/views/page.js',

                    'js/dev/core/common.js'
                ],
                dest: filePath+'js/adf.min.js',
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
                dest: filePath+'js/lib.min.js',
            },
            plugins: {
                src: [
                    'js/plugins/*.js'
                ],
                dest: filePath+'js/plugins.min.js',
            },
        },
        uglify: {
            options: {
                // mangle: false
            },
            templates: {
                files: [
                    {dest: filePath+'js/hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    'grunt-work/compiled.css': 'scss/main.scss'
                    // 'grunt-work/compiled.css' : ['scss/_variables.scss','scss/_mixins.scss','scss/partials/_layout.scss']
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
                        dest: filePath+'css/main.css'
                    }
                ]
            },
        },
        watch: {
            scriptsDev: {
                files: ['js/dev/**/*.js','Gruntfile.js'],
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
        },
        setPHPConstant: {
            stage: {
                constant    : 'CLIENT_PATH',
                value       : relativePath,
                file        : 'constants.php'
            }
        }
    });

    grunt.registerTask('default', ['copy','concat','sass:dist','handlebars','uglify:templates','autoprefixer','svgstore','setPHPConstant','watch']);
    grunt.registerTask('hbs', ['handlebars','uglify:templates']);
    grunt.registerTask('css', ['sass:dist','autoprefixer']);
    grunt.registerTask('svg', ['svgstore']);
    grunt.registerTask('scripts-dev', ['concat:dev']);
    grunt.registerTask('scripts-lib', ['concat:lib']);
    grunt.registerTask('scripts-plugins', ['concat:plugins']);

};