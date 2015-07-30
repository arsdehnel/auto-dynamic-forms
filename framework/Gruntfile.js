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
            buildType       : 'admin',
            buildTargetPath : '../dev/',
            localServerPath : '../../../dev/',
            cdnTargetPath   : '../dev/'
        },
        'acuraadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishacuraperformance/acuraadmin/src/webroot/v2/',
            localServerPath : '../../../acuraadmin-v2/'
        },
        'acuraadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/acuraadmin.biworldwide.com/acuraadmin/v2/',
            localServerPath : '../../../acuraadmin-v2/'
        },
        'gmadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishGM/gmadministration/src/webroot/v2/',
            localServerPath : '../../../gmadmin-v2/'
        },
        'gmadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/gmadmin.biworldwide.com/gmadministration/v2/',
            localServerPath : '../../../gmadmin-v2/'
        },
        'mbadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishMercedes/mbusa2011/mbusaadmin/src/webroot/v2/',
            localServerPath : '../../../mbadmin-v2/'
        },
        'mbadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/mercedesadmin.biworldwide.com/mbusaadmin/v2/',
            localServerPath : '../../../mbadmin-v2/'
        },
        'fcaadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishChrysler/fcaadmin/src/webroot/v2/',
            localServerPath : '../../../fcaadmin-v2/'
        },
        'fcaadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/fcaadmin.biworldwide.com/fcaadmin/v2/',
            localServerPath : '../../../fcaadmin-v2/'
        },
        'hyundaiadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishHyundai/HyundaiAdmin/src/webroot/v2/',
            localServerPath : '../../../hyundaiadmin-v2/'
        },
        'hyundaiadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/tmsadmin.biworldwide.com/tmsadmin/v2/',
            localServerPath : '../../../tmsadmin-v2/'
        },
        'tmsadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishToyotaMotorSales/tmsadmin/src/webroot/v2/',
            localServerPath : '../../../tmsadmin-v2/'
        },
        'tmsadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/tmsadmin.biworldwide.com/tmsadmin/v2/',
            localServerPath : '../../../tmsadmin-v2/'
        },
        'apc-static' : {
            buildType          : 'client',
            buildTargetPath    : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/v2/',
            jsBuildTargetPath  : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/js/adf/',
            cssBuildTargetPath : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/styles/',
            localServerPath    : '../../../dev/'
        },
        'hpc-static' : {
            buildType       : 'client',
            buildTargetPath   : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/v2/',
            jsBuildTargetPath : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/js/adf/',
            cssBuildTargetPath : '/Volumes/static_content-1/www.acuraperformancecenter.com/ahmperfcenter/styles/',
            localServerPath   : '../../../dev/'
        },
        'hps-static' : {
            buildType          : 'client',
            buildTargetPath    : '/Volumes/static_content-1/www.hondappc.com/ahmperfcenter/v2/',
            jsBuildTargetPath  : '/Volumes/static_content-1/www.hondappc.com/ahmperfcenter/js/adf/',
            cssBuildTargetPath : '/Volumes/static_content-1/www.hondappc.com/ahmperfcenter/styles/',
            localServerPath    : '../../../dev/'
        },
        'icv-static' : {
            buildType          : 'client',
            buildTargetPath    : '/Volumes/static_content-1/icv.performnet.com/nnaicv/v2/',
            jsBuildTargetPath  : '/Volumes/static_content-1/icv.performnet.com/nnaicv/js/adf/',
            cssBuildTargetPath : '/Volumes/static_content-1/icv.performnet.com/nnaicv/styles/',
            localServerPath    : '../../../dev/'
        },
            'acnmadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishACNM/acnmadmin/src/webroot/v2/',
            localServerPath : '../../../acnmadmin-v2/'
        },
        'acnmadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/kbbadmin.biworldwide.com/kbbadmin/v2/',
            localServerPath : '../../../acnmadmin-v2/'
        },
        'candiadmin' : {
            buildType       : 'admin',
            buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishNissan/candiadmin/src/webroot/v2/',
            localServerPath : '../../../candiadmin-v2/'
        },
        'candiadmin-static' : {
            buildType       : 'admin',
            buildTargetPath : '/Volumes/static_content-1/candiadmin.biworldwide.com/candiadmin/v2/',
            localServerPath : '../../../candiadmin-v2/'
        }
    };

    if( !client ){
        grunt.fail.fatal('no client set');
    }

    var clientObj = clients[client];
    buildTargetPath = clients[client].buildTargetPath;
    localServerPath = clients[client].localServerPath;
    var cdnTargetPath = ( clientObj.cdnTargetPath ? clientObj.cdnTargetPath : '/Volumes/zonegrps-2/grp0143/apache2/prod0143m1-docroot/cdn/adf/' );

    if( !buildTargetPath || !localServerPath ){
        grunt.fail.fatal('no buildTargetPath or localServerPath set');
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            fonts: {
                src: 'fonts/*.woff',
                dest: cdnTargetPath+'/'
            },
            svg: {
                src: ['svg/*.svg','svg/**/*.svg'],
                dest: cdnTargetPath+'/'
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

                        // core
                        'js/dev/views/core/*.js',

                        // actions
                        'js/dev/views/actions/*.js',

                        // inputs
                        'js/dev/views/inputs/*.js',

                        // forms
                        'js/dev/views/forms/action.js',
                        'js/dev/views/forms/actions.js',
                        'js/dev/views/forms/fields.js',
                        'js/dev/views/forms/form.js',

                        // grids
                        'js/dev/views/grids/action.js',
                        'js/dev/views/grids/actions.js',
                        'js/dev/views/grids/column-select-item.js',
                        'js/dev/views/grids/column-select.js',
                        'js/dev/views/grids/filter-item.js',
                        'js/dev/views/grids/filter.js',
                        'js/dev/views/grids/header.js',
                        'js/dev/views/grids/headers.js',
                        'js/dev/views/grids/row.js',
                        'js/dev/views/grids/body.js',
                        'js/dev/views/grids/grid.js',

                        // messages
                        'js/dev/views/messages/message.js',
                        'js/dev/views/messages/window.js',

                        // modules
                        'js/dev/views/modules/action.js',
                        'js/dev/views/modules/actions.js',
                        'js/dev/views/modules/module.js',
                        'js/dev/views/modules/module-list.js',
                        'js/dev/views/modules/modules.js',

                    'js/dev/core/common.js'
                ],
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'adf.min.js',
            },
            libAdmin:  {
                src: [
                    'js/lib/jquery-*.min.js',
                    'js/lib/jquery-ui.js',
                    'js/lib/codemirror-5.5/lib/codemirror.js',
                    'js/lib/codemirror-5.5/addon/selection-pointer.js',
                    'js/lib/codemirror-5.5/addon/edit/matchbrackets.js',
                    'js/lib/codemirror-5.5/mode/xml/xml.js',
                    'js/lib/codemirror-5.5/mode/javascript/javascript.js',
                    'js/lib/codemirror-5.5/mode/css/css.js',
                    'js/lib/codemirror-5.5/mode/htmlmixed/htmlmixed.js'
                ],
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'lib-admin.min.js',
            },
            lib: {
                src: [
                    'js/lib/underscore.js',
                    'js/lib/backbone.js',
                    'js/lib/backbone.super.js',
                    'js/lib/backbone.wreqr.js',
                    'js/lib/backbone.babysitter.js',
                    'js/lib/backbone.marionette.js',
                    'js/lib/handlebars.min.js',
                    'js/lib/spin.js'
                    // 'js/lib/select2.js',
                    // 'js/lib/chosen.js',
                ],
                dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'lib.min.js',
            },
            handlebarsHelpers: {
                src: [
                    'js/plugins/handlebars-helpers/*.js'
                ],
                // written to the local directories because the plugins concatenation later will pull these into the plugins.min.js file
                dest: 'js/plugins/handlebars-helpers.min.js',
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
                sourceMap: true
            },
            templates: {
                files: [
                    {dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
                ]
            },
            dist: {
                files: [
                    {dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'adf.min.js', src: [(clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'adf.min.js']},
                    {dest: (clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'plugins.min.js', src: [(clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/')+'plugins.min.js']}
                ]
            }
        },
        sass: {
            admin: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'grunt-work/compiled.css': 'scss/main.scss'
                }
            },
            client: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'grunt-work/compiled.css': 'scss/client.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            admin: {
                files: [
                    {
                        src: 'grunt-work/compiled.css',
                        dest: ( clientObj.cssBuildTargetPath ? clientObj.cssBuildTargetPath : clientObj.buildTargetPath+'css/' )+'main.css'
                    }
                ]
            },
            client: {
                files: [
                    {
                        src: 'grunt-work/compiled.css',
                        dest: ( clientObj.cssBuildTargetPath ? clientObj.cssBuildTargetPath : clientObj.buildTargetPath+'css/' )+'adf.css'
                    }
                ]
            }
        },
        watch: {
            scriptsDev: {
                files: ['js/dev/**/*.js','js/dev/**/**/*.js'],
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
                files: ['scss/lib/*.scss','scss/partials/*.scss','scss/partials/**/*.scss','scss/skins/*.scss','scss/*.scss'],
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
            watchJs: {
                options: {
                    title: 'JS Build Complete',  // optional
                    message: 'JS build finished running', //required
                }
            },
            watchCss: {
                options: {
                    title: 'CSS Build Complete',  // optional
                    message: 'CSS build finished running', //required
                }
            },
            watchHbs: {
                options: {
                    title: 'HBS Build Complete',  // optional
                    message: 'Handlebars build finished running', //required
                }
            },
            watchSvg: {
                options: {
                    title: 'SVG Build Complete',  // optional
                    message: 'SVG build finished running', //required
                }
            }
        },
    });

    grunt.registerTask('skin', function () {
        if( grunt.file.exists('scss/skins/'+(client.split(/\s*\-\s*/g))[0]+'.scss') ){
            if( grunt.file.exists('scss/skin.scss') ){
                grunt.file.delete('scss/skin.scss');
            }
            grunt.file.write('scss/skin.scss', '@import "skins/' + (client.split(/\s*\-\s*/g))[0] + '";');
        }
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
    // grunt.registerTask('default', ['svgstore','copy','concat','skin','sass:dist','handlebars','uglify:templates','autoprefixer','setPHPConstant','watch']);
    grunt.registerTask('hbs', ['handlebars','uglify:templates','notify:watchHbs']);
    grunt.registerTask('css', function(){
        if( clientObj.buildType === 'admin' ){
            grunt.task.run(['skin','sass:admin','autoprefixer:admin','notify:watchCss']);
        }else{
            grunt.task.run(['skin','sass:client','autoprefixer:client','notify:watchCss']);
        }
    });
    grunt.registerTask('svg', ['svgstore','copy:svg','notify:watchSvg']);
    grunt.registerTask('scripts-dev', ['concat:dev','notify:watchJs']);
    grunt.registerTask('scripts-lib', ['concat:lib']);
    grunt.registerTask('scripts-plugins', ['concat:plugins']);
    grunt.registerTask('scripts-tests', ['concat:tests']);
    grunt.registerTask('default', ['svgstore','copy','concat','css','handlebars','uglify:templates','setPHPConstant','watch']);

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
            'adf.min.js.map',
            'hbsTemplates.min.js',
            'hbsTemplates.min.js.map',
            'lib.min.js',
            'plugins.min.js',
            'plugins.min.js.map'
        ];
        for (var client in clients) {
            if( client != 'dev' ){
                var clientObj = clients[client];
                console.log('');
                console.log('Client: '.green+client.blue);
                for( var fileIdx in distFiles ){
                    jsBuildTargetPath = clientObj.jsBuildTargetPath ? clientObj.jsBuildTargetPath : clientObj.buildTargetPath+'js/';
                    console.log('Copying '+clients.dev.buildTargetPath+'js/'+distFiles[fileIdx]+' to '+jsBuildTargetPath+distFiles[fileIdx]);
                    grunt.file.copy(clients.dev.buildTargetPath+'js/'+distFiles[fileIdx], jsBuildTargetPath+distFiles[fileIdx]);
                }
            }
        }
    });
    // TODO: change this to uglify the main JS files and not just the HBS templates
    // TODO: figure out a way to distribute each skin
    // TODO: make proper dev and dist builds while still allowing dev builds to go to client locations
    // this currently just distributes the 5 JS files
    grunt.registerTask('dist',['concat','uglify:dist','handlebars','uglify:templates','dist-js']);

};