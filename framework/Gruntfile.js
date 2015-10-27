/*global
module,
require
*/

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var clientName = grunt.option('client');
    var staticRoot = grunt.option('staticRoot');
    var client = require('../clients/'+clientName);

    // var clients = {
    //     'acuraadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishacuraperformance/acuraadmin/src/webroot/v2/',
    //         localServerPath : '../../../acuraadmin-v2/'
    //     },
    //     'acuraadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : mappedPath('/Volumes/static_content','acuraadmin.biworldwide.com')+'/acuraadmin/v2/',
    //         localServerPath : '../../../acuraadmin-v2/'
    //     },
    //     'gmadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishGM/gmadministration/src/webroot/v2/',
    //         localServerPath : '../../../gmadmin-v2/'
    //     },
    //     'gmadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/gmadmin.biworldwide.com/gmadministration/v2/',
    //         localServerPath : '../../../gmadmin-v2/'
    //     },
    //     'mbadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishMercedes/mbusa2011/mbusaadmin/src/webroot/v2/',
    //         localServerPath : '../../../mbadmin-v2/'
    //     },
    //     'mbadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/mercedesadmin.biworldwide.com/mbusaadmin/v2/',
    //         localServerPath : '../../../mbadmin-v2/'
    //     },
    //     'fcaadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishChrysler/fcaadmin/src/webroot/v2/',
    //         localServerPath : '../../../fcaadmin-v2/'
    //     },
    //     'fcaadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/fcaadmin.biworldwide.com/fcaadmin/v2/',
    //         localServerPath : '../../../fcaadmin-v2/'
    //     },
    //     'hyundaiadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishHyundai/HyundaiAdmin/src/webroot/v2/',
    //         localServerPath : '../../../hyundaiadmin-v2/'
    //     },
    //     'hyundaiadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/tmsadmin.biworldwide.com/tmsadmin/v2/',
    //         localServerPath : '../../../tmsadmin-v2/'
    //     },
    //     'tmsadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishToyotaMotorSales/tmsadmin/src/webroot/v2/',
    //         localServerPath : '../../../tmsadmin-v2/'
    //     },
    //     'tmsadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/tmsadmin.biworldwide.com/tmsadmin/v2/',
    //         localServerPath : '../../../tmsadmin-v2/'
    //     },
    //     'apc-static' : {
    //         buildType          : 'client',
    //         buildTargetPath    : mappedPath('/Volumes/static_content','/www.acuraperformancecenter.com')+'/ahmperfcenter/v2/',
    //         jsBuildTargetPath  : mappedPath('/Volumes/static_content','/www.acuraperformancecenter.com')+'/ahmperfcenter/js/adf/',
    //         cssBuildTargetPath : mappedPath('/Volumes/static_content','/www.acuraperformancecenter.com')+'/ahmperfcenter/styles/',
    //         localServerPath    : '../../../dev/'
    //     },
    //     'tpc-static' : {
    //         buildType           : 'client',
    //         buildTargetPath     : '/Volumes/static_content/www.toyotaperformancecenter.com/tmsperfcenter/v2/',
    //         jsBuildTargetPath   : '/Volumes/static_content/www.toyotaperformancecenter.com/tmsperfcenter/js/adf/',
    //         cssBuildTargetPath  : '/Volumes/static_content/www.toyotaperformancecenter.com/tmsperfcenter/styles/',
    //         localServerPath     : '../../../dev/'
    //     },        
    //     'hpc-static' : {
    //         buildType       : 'client',
    //         buildTargetPath   : '/Volumes/static_content/www.acuraperformancecenter.com/ahmperfcenter/v2/',
    //         jsBuildTargetPath : '/Volumes/static_content/www.acuraperformancecenter.com/ahmperfcenter/js/adf/',
    //         cssBuildTargetPath : '/Volumes/static_content/www.acuraperformancecenter.com/ahmperfcenter/styles/',
    //         localServerPath   : '../../../dev/'
    //     },
    //     'hps-static' : {
    //         buildType          : 'client',
    //         buildTargetPath    : '/Volumes/static_content/www.hondappc.com/ahmperfcenter/v2/',
    //         jsBuildTargetPath  : '/Volumes/static_content/www.hondappc.com/ahmperfcenter/js/adf/',
    //         cssBuildTargetPath : '/Volumes/static_content/www.hondappc.com/ahmperfcenter/styles/',
    //         localServerPath    : '../../../dev/'
    //     },
    //     'icv-static' : {
    //         buildType          : 'client',
    //         buildTargetPath    : '/Volumes/static_content/icv.performnet.com/nnaicv/v2/',
    //         jsBuildTargetPath  : '/Volumes/static_content/icv.performnet.com/nnaicv/js/adf/',
    //         cssBuildTargetPath : '/Volumes/static_content/icv.performnet.com/nnaicv/styles/',
    //         localServerPath    : '../../../dev/'
    //     },
    //     'acnmadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishACNM/acnmadmin/src/webroot/v2/',
    //         localServerPath : '../../../acnmadmin-v2/'
    //     },
    //     'acnmadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Volumes/static_content/kbbadmin.biworldwide.com/kbbadmin/v2/',
    //         localServerPath : '../../../acnmadmin-v2/'
    //     },
    //     'candiadmin' : {
    //         buildType       : 'admin',
    //         buildTargetPath : '/Users/dehnel/cvsroot/client/auto/GlassFishNissan/candiadmin/src/webroot/v2/',
    //         localServerPath : '../../../candiadmin-v2/'
    //     },
    //     'candiadmin-static' : {
    //         buildType       : 'admin',
    //         buildTargetPath : mappedPath('/Volumes/static_content','candiadmin.biworldwide.com')+'/candiadmin/v2/',
    //         localServerPath : '../../../candiadmin-v2/'
    //     }
    // };

    if( !client ){
        grunt.fail.fatal('no client set');
    }

    if( !client.buildTargetPath  ){
        grunt.fail.fatal('no buildTargetPath set');
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            fonts: {
                src: 'fonts/*.woff',
                dest: client.cdnTargetPath+'/'
            }
        },
        svg_sprite: {
            complex: {
 
                // Target basics 
                cwd                     : './svg/symbols',
                src                     : ['*.svg'],
                dest                    : client.cdnTargetPath+'svg',
     
                // Target options 
                options                 : {
                    shape               : {
                        dimension       : {         // Set maximum dimensions 
                            maxWidth    : 32,
                            maxHeight   : 32
                        },
                        spacing         : {         // Add padding 
                            padding     : 10
                        },
                        dest            : './symbols'
                    },
                    mode                : {
                        symbolMode      : {
                            mode            : 'symbol',
                            prefix          : 'icon-%s',
                            sprite          : '../defs.svg'
                        },
                        viewMode     : {
                            mode            : 'view',
                            prefix          : 'icon-%s',
                            dest            : 'symbols'
                        }
                    }
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: function(filename) {

                        var path = 'ADF.templates';

                        // convert directory path into array
                        var dirArray = filename.split('/');

                        // remove the first one (tpl)
                        dirArray.shift();

                        // remove the last one (filename)
                        dirArray.pop();

                        for( var dirIdx in dirArray ){
                            path += '.' + dirArray[dirIdx].replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                        }

                        return path;
                    },
                    processName: function(buildTargetPath) {
                        // remove the directories
                        var tmpltName = buildTargetPath.replace(/^.*[\\\/]/, '');

                        // camelize
                        tmpltName = tmpltName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

                        // remove the file extension
                        tmpltName = tmpltName.substr(0, tmpltName.lastIndexOf('.'));

                        return tmpltName;
                    }
                },
                files: {
                    'grunt-work/hbsTemplates.js': ['tpl/**/*.hbs']
                }
            }
        },
        uglify: {
            options: {
                beautify: true,
                mangle: false,
                sourceMap: true
            },
            templates: {
                files: [
                    {dest: (client.jsBuildTargetPath ? staticRoot+client.jsBuildTargetPath : staticRoot+client.buildTargetPath+'js/')+'hbsTemplates.min.js', src: ['grunt-work/hbsTemplates.js']}
                ]
            },            
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
                    'js/dev/regions/widget-editor.js',
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
                        'js/dev/views/core/dropdown.js',
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
                dest: (client.jsBuildTargetPath ? staticRoot+client.jsBuildTargetPath : staticRoot+client.buildTargetPath+'js/')+'adf.min.js',
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
                dest: (client.jsBuildTargetPath ? staticRoot+client.jsBuildTargetPath : staticRoot+client.buildTargetPath+'js/')+'lib-admin.min.js',
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
                dest: (client.jsBuildTargetPath ? staticRoot+client.jsBuildTargetPath : staticRoot+client.buildTargetPath+'js/')+'lib.min.js',
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
                dest: (client.jsBuildTargetPath ? staticRoot+client.jsBuildTargetPath : staticRoot+client.buildTargetPath+'js/')+'plugins.min.js',
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            admin: {
                files: {
                    'grunt-work/compiled.css': 'scss/main.scss'
                }
            },
            client: {
                files: {
                    'grunt-work/compiled.css': 'scss/client.scss'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: 'last 1 version'})
                ]
            },
            admin: {
                files: [
                    {
                        src: 'grunt-work/compiled.css',
                        dest: ( client.cssBuildTargetPath ? staticRoot+client.cssBuildTargetPath : staticRoot+client.buildTargetPath+'css/' )+'main.css'
                    }
                ]
            },
            client: {
                files: [
                    {
                        src: 'grunt-work/compiled.css',
                        dest: ( client.cssBuildTargetPath ? staticRoot+client.cssBuildTargetPath : staticRoot+client.buildTargetPath+'css/' )+'adf.css'
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
                files: ['js/plugins/*.js','js/plugins/**/*.js'],
                tasks: ['scripts-plugins']
            },
            scss: {
                files: ['scss/lib/*.scss','scss/partials/*.scss','scss/partials/**/*.scss','scss/skins/*.scss','scss/*.scss'],
                tasks: ['styles']
            },
            hbs: {
                files: ['tpl/**/*.hbs'],
                tasks: ['templates']
            },
            svg: {
                files: ['svg/symbols/*.svg'],
                tasks: ['svgs']
            }
        },
        setPHPConstant: {
            stage: {
                constant    : 'CLIENT_PATH',
                value       : client.localServerPath,
                file        : 'constants.php'
            }
        },
        notify: {
            watchJsDev: {
                options: {
                    title: 'JS Dev Build Complete',  // optional
                    message: 'JS Dev build finished running ('+clientName+')'
                }
            },
            watchJsPlugins: {
                options: {
                    title: 'JS Plugins Build Complete',  // optional
                    message: 'JS Plugins build finished running ('+clientName+')', //required
                }
            },
            watchJsLib: {
                options: {
                    title: 'JS Library Build Complete',  // optional
                    message: 'JS Library build finished running ('+clientName+')', //required
                }
            },
            watchCss: {
                options: {
                    title: 'CSS Build Complete',  // optional
                    message: 'CSS build finished running ('+clientName+')', //required
                }
            },
            watchHbs: {
                options: {
                    title: 'HBS Build Complete',  // optional
                    message: 'Handlebars build finished running ('+clientName+')', //required
                }
            },
            watchSvg: {
                options: {
                    title: 'SVG Build Complete',  // optional
                    message: 'SVG build finished running ('+clientName+')', //required
                }
            }
        },
    });

    grunt.registerTask('skin', function () {
        if( grunt.file.exists('scss/skins/'+(clientName.split(/\s*\-\s*/g))[0]+'.scss') ){
            if( grunt.file.exists('scss/skin.scss') ){
                grunt.file.delete('scss/skin.scss');
            }
            grunt.file.write('scss/skin.scss', '@import "skins/' + (clientName.split(/\s*\-\s*/g))[0] + '";');
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

    // TODO: add php constant or build HTML pages only for "dev" client
    

    grunt.registerTask('default', ['svgs','fonts','templates','scripts','styles','watch']);

    // WATCH script tasks
    // these tasks are just for watch events so as to not have to rebuild all the scripts every time
        grunt.registerTask('scripts-dev', ['uglify:dev','notify:watchJsDev']);
        grunt.registerTask('scripts-lib', ['uglify:lib','uglify:libAdmin','notify:watchJsLib']);
        grunt.registerTask('scripts-plugins', ['uglify:handlebarsHelpers','uglify:plugins','notify:watchJsPlugins']);

    // these tasks consolidate all the messy config stuff so we know what is happening for each type of task
        grunt.registerTask('svgs', function() {
            grunt.task.run(['svg_sprite','notify:watchSvg']);
        });

        grunt.registerTask('fonts', function() {
            grunt.task.run(['copy:fonts']);
        });

        grunt.registerTask('templates', function() {
            grunt.task.run(['handlebars','uglify:templates','notify:watchHbs']);
        });   

        grunt.registerTask('scripts', function() {
            grunt.task.run(['scripts-lib','scripts-plugins','scripts-dev']);
        });  

        grunt.registerTask('styles', function() {
            if( client.buildType === 'admin' ){
                grunt.task.run(['skin','sass:admin','postcss:admin','notify:watchCss']);
            }else{
                grunt.task.run(['skin','sass:client','postcss:client','notify:watchCss']);
            }
        });  

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
                var client = clients[client];
                console.log('');
                console.log('Client: '.green+client.blue);
                for( var fileIdx in distFiles ){
                    jsBuildTargetPath = client.jsBuildTargetPath ? client.jsBuildTargetPath : client.buildTargetPath+'js/';
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