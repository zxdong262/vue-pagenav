
const
gulp = require('gulp')
,path = require('path')
,util = require('util')
,gutil = require('gulp-util')
,pkg = require('./package.json')
,fs = require('fs')
,rename = require('gulp-rename')
,plumber = require('gulp-plumber')
,uglify = require('gulp-uglify')
,concat = require('gulp-concat-util')
,karma = require('karma').server
,runSequence = require('run-sequence')
,watch = require('gulp-watch')
// CONFIG
//

var src = {
	cwd: 'src'
	,dist: 'dist'
}

var banner = gutil.template('/**\n' +
	' * <%= pkg.name %>\n' +
	' * @version v<%= pkg.version %> - <%= today %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
	' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
	' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)})


// SCRIPTS
gulp.task('scripts:dist', function() {

	// Build package
	gulp.src(['./src/vue-pagenav.js'])
		.pipe(concat.header('(function(window, document, undefined) {\n'))
		.pipe(concat.footer('\n\n})(window, document);\n'))
		.pipe(concat.header(banner))
		.pipe(gulp.dest(src.dist))
		.pipe(rename(function(path) { path.extname = '.min.js'; }))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(concat.header(banner))
		.pipe(gulp.dest(src.dist))

})

// TEST


gulp.task('karma:unit', function() {
	karma.start({
		configFile: path.join(__dirname, 'test/karma.conf.js'),
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		singleRun: true
	}, function(code) {
		gutil.log('Karma has exited with ' + code)
		process.exit(code)
	})
})


//watch
gulp.task('watch-file',  function () {

	watch([src.cwd + '/vue-pagenav.js', __dirname + '/package.json'], function() {
		runSequence('scripts:dist')
	})

})

// DEFAULT
gulp.task('default', ['watch-file'])
gulp.task('build', ['dist'])
gulp.task('test', ['karma:unit'])
gulp.task('dist', ['scripts:dist'])
gulp.task('dt', function() {
	runSequence('dist', 'test')
})

