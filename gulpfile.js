//加载插件
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

//gulp.task这个API用来创建任务，在命令行下可以输入$ gulp styles来执行上面的任务。
gulp.task('styles', function() {

//gulp.src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss。
  return gulp.src('src/styles/main.scss')

//我们使用.pipe()这个API将需要处理的文件导向sass插件，那些插件的用法可以在github上找到，为了方便大家查找我已经在上面列出来了。
    .pipe(sass({ style: 'expanded' }))


    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

//gulp.dest()API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。
//为了更好的了解Gulp API，强烈建议看一下Gulp API文档，其实Gulp API就这么几个，没什么好可怕的。

    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


//js代码校验、合并和压缩
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


//图片压缩

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});


//清除文件

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

//设置默认任务（default）
//我们在命令行下输入$ gulp执行的就是默认任务，现在我们为默认任务指定执行上面写好的三个任务：


gulp.task('default', ['clean','watch'], function() {
    gulp.start('styles', 'scripts', 'images');
});

//监听文件
//为了监听文件的是否修改以便执行相应的任务，我们需要创建一个新的任务，然后利用gulp.watchAPI实现
//我们将不同类型的文件分开处理，执行对应的数组里的任务。现在我们可以在命令行输入$ gulp watch执行监听任务，当.sass、.js和图片修改时将执行对应的任务。


gulp.task('watch', function() {

 livereload.listen();

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']).on('change', livereload.changed);
  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']).on('change', livereload.changed);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']).on('change', livereload.changed);
});



/*
//Gulp也可以实现当文件修改时自动刷新页面，我们要修改watch任务，配置LiveReload
//要使这个能够工作，还需要在浏览器上安装LiveReload插件

gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
*/
