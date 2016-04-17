
var gulp = require('gulp')
var path = require('path')
var util = require('util')
var gutil = require('gulp-util')
var pkg = require('./package.json')
var fs = require('fs')
var rename = require('gulp-rename')
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat-util')
var karma = require('karma').server
var runSequence = require('run-sequence')
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

// DEFAULT
gulp.task('default', ['dist'])
gulp.task('build', ['dist'])
gulp.task('test', ['karma:unit'])
gulp.task('dist', ['scripts:dist'])
gulp.task('dt', function() {
	runSequence('dist', 'test')
})

