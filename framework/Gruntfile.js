/*global
module,
require
*/
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var client = grunt.option('client');
    var buildTargetPath;
    var localServerPath;
    var clients = {
        'dev' : {
            buildTargetPath : '../dev/',
            localServerPath : '../../../dev/'
        },
        'acuraadmin' : {
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishacuraperformance/acuraadmin/src/webroot/v2/',
            localServerPath : '../../../acuraadmin-v2/'
        },
        'acuraadmin-static' : {
            buildTargetPath : '/Volumes/static_content/acuraadmin.biworldwide.com/acuraadmin/v2/',
            localServerPath : '../../../acuraadmin-v2/'
        },
        'apc-static' : {
            buildTargetPath   : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/v2/',
            jsBuildTargetPath : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/js/adf/',
            localServerPath   : '../../../dev/'
        },
        'hpc-static' : {
            buildTargetPath   : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/v2/',
            jsBuildTargetPath : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/js/adf/',
            localServerPath   : '../../../dev/'
        },
        'hps-static' : {
            buildTargetPath   : '/Volumes/static_content/www.hondappc.com/ahmperfcenter/v2/',
            jsBuildTargetPath : '/Volumes/static_content/www.hondappc.com/ahmperfcenter/js/adf/',
            localServerPath   : '../../../dev/'
        },        
        'acnmadmin' : {
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishACNM/acnmadmin/src/webroot/v2/',
            localServerPath : '../../../acnmadmin-v2/'
        },
        'acnmadmin-static' : {
            buildTargetPath : '/Volumes/static_content/kbbadmin.biworldwide.com/kbbadmin/v2/',
            localServerPath : '../../../acnmadmin-v2/'
        },
        'candiadmin' : {
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishNissan/candiadmin/src/webroot/v2/',
            localServerPath : '../../../candiadmin-v2/'
        },
        'candiadmin-static' : {
            buildTargetPath : '/Volumes/static_content/candiadmin.biworldwide.com/candiadmin/v2/',
            localServerPath : '../../../candiadmin-v2/'
        }
    };

    if( !client ){
        grunt.fail.fatal('no client set');
    }
    
    var clientObj = clients[client];
    buildTargetPath = clients[client].buildTargetPath;
    localServerPath = clients[client].localServerPath;

    if( !buildTargetPath || !localServerPath ){
        grunt.fail.fatal('no buildTargetPath or localServerPath set');
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
            },
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
                    'js/dev/views/record.js',                    // has to be before module and gridRow
                    'js/dev/views/module.js',
                    'js/dev/views/modules.js',
                    'js/dev/views/grid-row.js',
                    'js/dev/views/grid.js',
                    'js/dev/views/header.js',
                    'js/dev/views/headers.js',
                    'js/dev/views/page.js',

                    'js/dev/core/common.js'
                ],
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'adf.min.js',
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
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'lib.min.js',
            },
            plugins: {
                src: [
                    'js/plugins/*.js'
                ],
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'plugins.min.js',
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
                    {dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
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
                files: ['scss/partials/*.scss','scss/partials/**/*.scss','scss/skins/*.scss','scss/*.scss'],
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
        },
    });

    grunt.registerTask('skin', function () {
        if( grunt.file.exists('scss/skin.scss') ){
            grunt.file.delete('scss/skin.scss');
        }
        grunt.file.write('scss/skin.scss', '@import "skins/' + (client.split(/\s*\-\s*/g))[0] + '";');
    });

/*
         888                      .d8888b.                              888           888          888                   888              
         888                     d88P  "88b                             888           888          888                   888              
         888                     Y88b. d88P                             888           888          888                   888              
     .d88888 .d88b. 888  888      "Y8888P"         888  888  888 8888b. 888888 .d8888b88888b.      888888 8888b. .d8888b 888  888.d8888b  
    d88" 888d8P  Y8b888  888     .d88P88K.d88P     888  888  888    "88b888   d88P"   888 "88b     888       "88b88K     888 .88P88K      
    888  88888888888Y88  88P     888"  Y888P"      888  888  888.d888888888   888     888  888     888   .d888888"Y8888b.888888K "Y8888b. 
    Y88b 888Y8b.     Y8bd8P      Y88b .d8888b      Y88b 888 d88P888  888Y88b. Y88b.   888  888     Y88b. 888  888     X88888 "88b     X88 
     "Y88888 "Y8888   Y88P        "Y8888P" Y88b     "Y8888888P" "Y888888 "Y888 "Y8888P888  888      "Y888"Y888888 88888P'888  888 88888P' 
                                                                                                                                          
*/
    //grunt.registerTask('default', ['svgstore','copy','concat','skin','sass:dist','handlebars','uglify:templates','autoprefixer','setPHPConstant','watch']);
    // TODO: had to remove sass:dist because npm won't install node-sass on my new mac
    grunt.registerTask('default', ['svgstore','copy','concat','skin','sass:dist','handlebars','uglify:templates','autoprefixer','setPHPConstant','watch']);
    grunt.registerTask('hbs', ['handlebars','uglify:templates']);
    grunt.registerTask('css', ['skin','sass:dist','autoprefixer']);
    grunt.registerTask('svg', ['svgstore','copy:svg']);
    grunt.registerTask('scripts-dev', ['concat:dev']);
    grunt.registerTask('scripts-lib', ['concat:lib']);
    grunt.registerTask('scripts-plugins', ['concat:plugins']);
    grunt.registerTask('scripts-tests', ['concat:tests']);

    /*
             ___      __       _ __          __  _                __             __
        ____/ (_)____/ /______(_) /_  __  __/ /_(_)___  ____     / /_____ ______/ /_______
       / __  / / ___/ __/ ___/ / __ \/ / / / __/ / __ \/ __ \   / __/ __ `/ ___/ //_/ ___/
      / /_/ / (__  ) /_/ /  / / /_/ / /_/ / /_/ / /_/ / / / /  / /_/ /_/ (__  ) ,< (__  )
      \__,_/_/____/\__/_/  /_/_.___/\__,_/\__/_/\____/_/ /_/   \__/\__,_/____/_/|_/____/

    */
    grunt.registerTask('dist-js', function(){
        var jsBuildTargetPath;
        var distFiles = [
            'adf.min.js',
            'hbsTemplates.min.js',
            'lib.min.js',
            'plugins.min.js'
        ];
        for (var client in clients) {
            if( client != 'dev' ){
                var clientObj = clients[client];
                console.log('');
                console.log('Client: '.green+client.blue);
                for( var fileIdx in distFiles ){
                    jsBuildTargetPath = clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/';
                    console.log('Copying '+clients['dev'].buildTargetPath+'js/'+distFiles[fileIdx]+' to '+jsBuildTargetPath+distFiles[fileIdx]);
                    grunt.file.copy(clients['dev'].buildTargetPath+'js/'+distFiles[fileIdx], jsBuildTargetPath+distFiles[fileIdx]);
                }
            }
        }
    });
    // TODO: change this to uglify the main JS files and not just the HBS templates
    // TODO: figure out a way to distribute each skin and fonts, etc.
    // this currently just distributes the 4 JS files
    grunt.registerTask('dist',['svgstore','concat','handlebars','uglify:templates','dist-js']);

};