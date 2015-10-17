var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    webpack = require('webpack-stream'),
    path = require("path"),
    fileinclude = require('gulp-file-include'),
    rename = require('gulp-rename'),
    argv = require('yargs').argv;

var mappedPath = function( pathBase, subdir ){
    var path;
    for( var i=0; i < 10; i++ ){
        if( i === 0 ){
            path = pathBase+'/';
        }else{
            path = pathBase+'-'+i+'/';
        }
        path += subdir;
    //    if( grunt.file.isDir( path ) ){
        if( i === 3 ){
            break;
        }else{
            path = false;
        }

    }
    return path;
};

var clients = {
    'acuraadmin-static' : {
        clientType      : 'admin',
        staticDir       : 'acuraadmin.biworldwide.com/acuraadmin/v2/'
    },
}

var paths = {
    styles: {
        src: './scss/',
        files: {
            admin: './scss/main.scss',
            client: './scss/client.scss'
        },
        partials: './scss/**/*.scss',
        dest: {
            admin: '/Volumes/static_content-3/',
            client: './scss/client.scss'
        }
    }
};



gulp.task('sass', function(){
    return gulp.src(paths.styles.files[clients[argv.client].clientType])
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths : [paths.styles.src]
        }))
        .on('error', function(error){
            var errorString = '[' + error.plugin + ']';
            errorString += ' ' + error.message.replace('\n',''); // Removes new line at the end

            if (error.fileName)   { errorString += ' in ' + error.fileName; }
            if (error.lineNumber) { errorString += ' on line ' + error.lineNumber; }

            console.error(errorString);
        })
        .pipe(prefix('last 2 version', 'Explorer > 8', 'iOS > 6', 'Android > 3'))
        .pipe(gulp.dest(paths.styles.dest[clients[argv.client].clientType] + clients[argv.client].staticDir + 'css/'))
        .pipe(notify('[watcher] File ' + paths.styles.dest[clients[argv.client].clientType] + clients[argv.client].staticDir + 'css/' + ', compiling...'));
});


gulp.task('html', function() {
    return gulp.src(path.join(paths.html.src,'*.html'))
        .pipe(fileinclude())
        .pipe(rename({
            extname:''
        }))
        .pipe(rename({
            extname:'.html'
        }))
        .pipe(gulp.dest(paths.html.dest));
});


gulp.task('scripts', function(done) {
    return gulp.src(paths.scripts.files)
        .pipe(named())
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        query: {compact: false},
                        exclude: /(node_modules)/
                    }
                ]
            }
        }))
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('json', function(done) {
    return gulp.src(paths.json.files)
        .pipe(gulp.dest(paths.json.dest));
});



// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
// gulp.task('default', ['sass', 'html', 'scripts', 'json'], function() {
gulp.task('default', ['sass'], function() {
    gulp.watch(paths.styles.files[clients[argv.client].clientType], ['sass'])
    gulp.watch(paths.styles.partials, ['sass'])
        .on('change', function(evt) {
            notify(
                '[watcher] File ' + evt.path.replace(/.*(?=\/scss)/,'') + ' was ' + evt.type + ', compiling...'
            );
        });

    /*
    gulp.watch(paths.html.files, ['html'])
        .on('change', function(evt) {
            notify('HTML file changed, build task complete');
        });

    gulp.watch(paths.html.partials, ['html'])
        .on('change', function(evt) {
            notify('HTML partial changed, build task complete');
        });

    gulp.watch(paths.scripts.files, ['scripts'])
        .on('change', function(evt) {
            notify('[watcher] File ' + evt.path.replace(/.*(?=\/src)/,'') + ' was ' + evt.type + ', moving...');
        });
    gulp.watch(paths.scripts.modules, ['scripts'])
        .on('change', function(evt) {
            notify('[watcher] module ' + evt.path.replace(/.*(?=\/src)/,'') + ' was ' + evt.type + ', moving...');
        });
*/

});
