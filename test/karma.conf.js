// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

let port = require('../build/config').karmaPort

module.exports = function(config) {

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: './..',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'chai', 'chai-as-promised'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/vue/dist/vue.min.js',
      'node_modules/jquery/dist/jquery.js',
      {
        pattern: './dist/vue-pagenav.js',
        included: false,
        watched: true
      },
      'test/test.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'coverage'],

    // web server port
    port: port,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    browsers: ['PhantomJS'],

    // Timeouts for SauceLabs
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 2, // default 0
    browserNoActivityTimeout: 30 * 1000, //default 10000

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    preprocessors: {
      'test/test.js': ['webpack', 'sourcemap', 'coverage'],
      'dist/vue-pagenav.js': ['coverage']
    },

    webpack: {
      devtool: 'inline-source-map'
      ,externals: {
        'vue': 'Vue',
        'vue-pagenav': 'zPagenav'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
        ,postLoaders: [
          { //delays coverage til after tests are run, fixing transpiled source coverage error
            test: /\vue\-pagenav\.js$/,
            exclude: /(test|node_modules)\//,
            include: ['dist'],
            loader: 'istanbul-instrumenter'
          } 
        ]
      }
    },

    plugins: [
      'karma-mocha',
      'karma-chai-plugins',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],

    // Coverage reporter generates the coverage
    coverageReporter: {
      reporters:[
        {type: 'lcov', dir:'test/coverage/'},
        {type: 'text-summary', dir:'test/coverage/'}
      ]
    }

  })

};
