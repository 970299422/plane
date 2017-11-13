

var gulp = require("gulp");
/*
var gulp = require("gulp");
gulp.src("js/ajax1.js")
	.pipe(gulp.dest("rejs"));

gulp.task("one",function(){
	console.log("one")
})
*/

var uglify = require("gulp-uglify");
var babel = require('gulp-babel');
gulp.task("jstask1",function(){
	
	gulp.src("js/*")
		.pipe(babel({"presets": ["es2015"]}))
		.pipe(uglify())
		.pipe(gulp.dest("rejs"));
	
})

gulp.task("default",["jstask1"]);


