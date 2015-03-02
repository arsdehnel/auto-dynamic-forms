/*global
module,
require
*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var client = grunt.option('client');
    var buildTargetPath;
    var localServerPath;

    if( !client ){
        grunt.fail.fatal('no client set');
    }

    switch( client ) {

        case 'acuraadmin':
            buildTargetPath = '/Users/dehnel/cvsroot/client/auto/GlassFishacuraperformance/acuraadmin/src/webroot/v2/';
            localServerPath = '../../../acuraadmin-v2/';
            break;
        case 'acnmadmin':
            buildTargetPath = '/Users/dehnel/cvsroot/client/auto/GlassFishACNM/acnmadmin/src/webroot/v2/';
            localServerPath = '../../../acnmadmin-v2/';
            break;
        case 'candiadmin':
            buildTargetPath = '/Users/dehnel/cvsroot/client/auto/GlassFishNissan/candiadmin/src/webroot/v2/';
            localServerPath = '../../../candiadmin-v2/';
            break;
        case 'candiadmin-static':
            buildTargetPath = '/Volumes/static_content/candiadmin.biworldwide.com/candiadmin/v2/';
            localServerPath = '../../../candiadmin-v2/';
            break;
        case 'client':
            buildTargetPath = '../client/';
            localServerPath = '../../../client/';
            break;

    }

    if( !buildTargetPath ){
        grunt.fail.fatal('no buildTargetPath set');
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            fonts: {
                src: 'fonts/*.woff',
                dest: buildTargetPath+'/'
            },
            svg: {
                src: ['svg/*.svg','svg/**/*.svg'],
                dest: buildTargetPath+'/'
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
                    processName: function(buildTargetPath) {
                        var tmpltName = buildTargetPath.replace(/^.*[\\\/]/, '').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
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
                    'js/dev/regions/modules.js',
                    'js/dev/regions/overlay-grid.js',
                    'js/dev/regions/messages-window.js',
                    // models
                    'js/dev/models/field.js',
                    'js/dev/models/record.js',
                    'js/dev/models/module.js',
                    'js/dev/models/dropdown-menu.js',
                    'js/dev/models/action.js',
                    'js/dev/models/message.js',
                    // collections
                    'js/dev/collections/*.js',
                    // views
                    'js/dev/views/dropdown-menu.js',
                    'js/dev/views/cell.js',
                    'js/dev/views/column-select-item.js',
                    'js/dev/views/column-select.js',
                    'js/dev/views/grid-action.js',
                    'js/dev/views/grid-actions.js',
                    'js/dev/views/grid-filter-item.js',
                    'js/dev/views/grid-filter.js',
                    'js/dev/views/message.js',
                    'js/dev/views/messages-window.js',
                    'js/dev/views/form-action.js',
                    'js/dev/views/field.js',
                    'js/dev/views/form.js',
                    'js/dev/views/module.js',
                    'js/dev/views/modules.js',
                    'js/dev/views/record.js',                    // has to be before grid
                    'js/dev/views/grid.js',
                    'js/dev/views/header.js',
                    'js/dev/views/headers.js',
                    'js/dev/views/page.js',

                    'js/dev/core/common.js'
                ],
                dest: buildTargetPath+'js/adf.min.js',
            },
            lib: {
                src: [
                    'js/lib/jquery-*.min.js',
                    'js/lib/jquery-ui.js',
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
                dest: buildTargetPath+'js/lib.min.js',
            },
            plugins: {
                src: [
                    'js/plugins/*.js'
                ],
                dest: buildTargetPath+'js/plugins.min.js',
            },
            tests: {
                src: [
                    'testing/tests/**/*.js'
                ],
                dest: 'testing/tests.js'
            }
        },
        uglify: {
            options: {
                // mangle: false
            },
            templates: {
                files: [
                    {dest: buildTargetPath+'js/hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
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
                        dest: buildTargetPath+'css/main.css'
                    }
                ]
            },
        },
        watch: {
            scriptsDev: {
                files: ['js/dev/**/*.js'],
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
            },
            config: {
                files: ['Gruntfile.js'],
                tasks: ['default']
            },
            options: {
                livereload: 12349
            }
        },
        setPHPConstant: {
            stage: {
                constant    : 'CLIENT_PATH',
                value       : localServerPath,
                file        : 'constants.php'
            }
        },
        notify: {
            'scripts-dev': {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'SASS and Uglify finished running', //required
                }
            }
        }
    });

    grunt.registerTask('default', ['svgstore','copy','concat','sass:dist','handlebars','uglify:templates','autoprefixer','setPHPConstant','watch']);
    grunt.registerTask('hbs', ['handlebars','uglify:templates']);
    grunt.registerTask('css', ['sass:dist','autoprefixer']);
    grunt.registerTask('svg', ['svgstore','copy:svg']);
    grunt.registerTask('scripts-dev', ['concat:dev']);
    grunt.registerTask('scripts-lib', ['concat:lib']);
    grunt.registerTask('scripts-plugins', ['concat:plugins']);
    grunt.registerTask('scripts-tests', ['concat:tests']);

};