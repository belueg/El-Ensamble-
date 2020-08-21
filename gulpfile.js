const gulp = require('gulp')
const { series } = require('gulp')
const purgecss = require('gulp-purgecss')
const imagemin = require('gulp-imagemin')
const webp = require('imagemin-webp')
const extReplace = require('gulp-ext-replace')
const cleanCSS = require('gulp-clean-css')


function removeUnusedCSS() {
  const src = 'css/*.css'
  const dest = 'build/css'

  return gulp
    .src(src)
    .pipe(
      purgecss({
        content: ['index.html']
      })
    )
    .pipe(gulp.dest(dest))
}

function minifyCSS() {
  // const src = 'build/css/*.css'
  const src = 'css/*.css'
  const dest = 'build/css'
  return gulp
    .src(src)
    .pipe(
      cleanCSS(
        {
          compatibility: 'ie9',
          keepSpecialComments: '*',
          advanced: false
        },
        details => {
          console.log(
            details,
            `${details.name}: saved ${
              details.stats.originalSize - details.stats.minifiedSize
            }kB`
          )
        }
      )
    )
    .pipe(gulp.dest(dest))
}

function optimizeImages() {
  const src = 'images/**/*'
  const dest = 'build/images'

  return gulp
    .src(src)
    .pipe(
      imagemin([
        webp({
          quality: 75
        })
      ])
    )
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest(dest))
}


// minifyCSS

exports.build = series(minifyCSS, optimizeImages)
exports.optimizeImages = optimizeImages