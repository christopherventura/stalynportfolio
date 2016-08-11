var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
	return browserify({entries: './react/src/index.js', extensions: ['.js'], debug: true})
		.transform('babelify', {
			presets: [
				'react',
				'es2015',
				'stage-0'
			],
			plugins: [
				'react-html-attrs',
				'transform-decorators-legacy',
				'transform-class-properties'
			]
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['build']);
