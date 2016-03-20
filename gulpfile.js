	var gulp 		= require("gulp");
	var del			= require("del");
	var less		= require("gulp-less");
	var uglify		= require("gulp-uglify");
	var jade		= require("gulp-jade");
	var miniCSS		= require("gulp-minify-css");
	var concat		= require("gulp-concat");
	var imagemin 	= require("gulp-imagemin");
	var fs 			= require("fs");

	var paths	= {
		src : {
			jade : "./src/views/*.jade",
			components : "./src/views/components/*.jade",
			less : "./src/less/*.less",
			js : ["./src/js/main.js", "./src/js/services/*.js", "./src/js/directives/*.js", "./src/js/controllers/*.js"],
			cssVendor: ["./src/less/vendor/*.css"],
			jsVendor : ["./bower_components/jquery/dist/jquery.min.js", "./bower_components/angular/angular.min.js", "./bower_components/angular-ui-router/release/angular-ui-router.min.js", "./bower_components/angular-sanitize/angular-sanitize.min.js", "./bower_components/angular-resource/angular-resource.min.js", "./bower_components/angular-animate/angular-animate.min.js"],
			localization: "./src/localization/*"
		},
		dest : {
			jade : "./public/",
			components : "./public/components/",
			less : "./public/css/",
			js : "./public/js/",
			images : "./public/imgs/",
			fonts: "./public/fonts/",
			localization: "./public/localization/"
		}
	}

	gulp.task("setup", function(){
		fs.mkdirSync("src");
		fs.mkdirSync("src/js");
		fs.mkdirSync("src/js/controllers");
		fs.mkdirSync("src/js/services");
		fs.mkdirSync("src/js/directives");
		fs.mkdirSync("src/less");
		fs.mkdirSync("src/less/partials");
		fs.mkdirSync("src/views");
		fs.mkdirSync("src/views/components");
		fs.mkdirSync("public");
		fs.mkdirSync("public/images");
		fs.mkdirSync("public/fonts");
		fs.mkdirSync("app");
	});

	gulp.task("jade", function(){
		return gulp.src(paths.src.jade)
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest(paths.dest.jade))
	});

	gulp.task("componentJade", function(){
		return gulp.src(paths.src.components)
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest(paths.dest.components))
	});

	gulp.task("less", function(){
		return gulp.src(paths.src.less)
			.pipe(less())
			.pipe(miniCSS())
			.pipe(gulp.dest(paths.dest.less))

	})

	gulp.task("minify", function(){
		return gulp.src(paths.src.js)
			.pipe(uglify())
			.pipe(concat("app.min.js"))
			.pipe(gulp.dest(paths.dest.js))
	})

	gulp.task("crunch", function(){
		return gulp.src(paths.dest.images)
			.pipe(imagemin())
			.pipe(gulp.dest(paths.dest.images))

	})

	gulp.task("copy-localization", function(){
		return gulp.src(paths.src.localization)
			.pipe(gulp.dest(paths.dest.localization))
	})

	gulp.task("copy-css", function(){
		return gulp.src(paths.src.cssVendor)
			.pipe(concat("vendor.css"))
			.pipe(miniCSS())
			.pipe(gulp.dest(paths.dest.less))
	})

	gulp.task("copy-libs", function(){
		return gulp.src(paths.src.jsVendor)
			.pipe(concat("vendor.js"))
			.pipe(gulp.dest(paths.dest.js))
	})

	gulp.task("cleanup", function(){
		del.sync([paths.dest.jade + "*.html", paths.dest.components, paths.dest.less, paths.dest.js]);
	})

	gulp.task("build", ["cleanup", "copy-libs", "copy-css", "copy-localization", "jade", "componentJade", "minify", "less"]);
	gulp.task("default", ["copy-libs", "copy-css", "copy-localization", "watch"]);

	gulp.task("watch", function(){
		gulp.watch("src/views/**/*.jade", ["jade", "componentJade"]);
		gulp.watch("src/less/**/*.less", ["less"]);
		gulp.watch("src/js/**/*.js", ["minify"]);
//		gulp.watch("src/localization/*", ["copy-localization"]);
	})