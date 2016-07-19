/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Gulp Konfigurationsdatei
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import gulp     from 'gulp';
import path     from 'path';
import webpack  from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import karma    from 'karma';
import esdoc    from 'gulp-esdoc';
import ip from 'ip';
import remapIstanbul from 'remap-istanbul/lib/gulpRemapIstanbul';

let webpackConfig = require('./webpack.config');
let root = 'src';

/**
 * Hilfsmethode: Dateien vom Pfad app/{glob} erhalten
 * @param glob Pfad nach app/
 * @returns {string} Den Pfad zur Applikation app/{glob}
 */
let resolveToApp = (glob) => {
    glob = glob || '';
    return path.join(root, 'app', glob);
};

/**
 * Hilfsmethode: Dateien vom Pfad app/components/{glob} erhalten
 * @param glob Pfad nach app/components/
 * @returns {string} Den Pfad zur Applikation app/components/{glob}
 */
let resolveToComponents = (glob) => {
    glob = glob || '';
    return path.join(root, 'app/components', glob);
};

/**
 * Map aller Dateien
 */
let paths = {
    js: resolveToComponents('**/*!(.spec.js).js'), // Alle .js ohne .spec.js
    css: resolveToApp('**/*.css'),
    html: [resolveToApp('**/*.html'), path.join(root, 'index.html')],
    entry: path.join(root, 'app/app.js'),
    output: 'dist',
    build: path.join(__dirname, 'target/build'),
    documentation: path.join(__dirname, 'target/documentation')
};

/**
 * Gulp-Task: Kopiert alle statischen Dateien nach /dist
 */
gulp.task('copyHtml', () => {
    return gulp.src(path.join(root, 'index.html')).pipe(gulp.dest(paths.output));
});

/**
 * Gulp-Task: Fuehrt webpack aus und startet den Development-Server
 */
gulp.task('serve', () => {
    return new WebpackDevServer(webpack(webpackConfig.development), {
        hot: true, contentBase: './dist/', watchOptions: {
            aggregateTimeout: 100, poll: 300
        }, stats: {
            colors: true
        }
    }).listen(3000, 'localhost', function (err) {
        if (err) {
            console.error(err);
        }
    });
});

/**
 * Gulp-Task: Fuehrt die Karma-Tests auf dem Selenium Webgrid aus
 */
gulp.task('test-selenium-webgrid', (done) => {

    let hostname = process.env.host || ip.address();
    let externalport = process.env.externalport || 7777;

    return new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        hostname: hostname,
        port: externalport,
        browsers: ['SeleniumFF', 'SeleniumCH'] // IE ausgeschaltet aufgrund Bug im Selenium-Grid: 'SeleniumIE'
    }, function () {
        // If tests are done, remap coverage file
        gulp.src('target/coverage/coverage.json')
            .pipe(remapIstanbul({
                reports: {
                    'lcovonly': 'target/surefire/lcov.info'
                }
            }));
        done();
    }).start();
});

/**
 * Gulp-Task: Fuehrt die Karma-Tests auf dem PhantomJS Browser aus
 */
gulp.task('test-phantomjs', (done) => {

    let hostname = process.env.host || ip.address();
    let externalport = process.env.externalport || 7777;

    return new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        hostname: hostname,
        port: externalport,
        browsers: ['PhantomJS']
    }, done).start();
});


/**
 * Gulp-Task: Fuehrt ESDoc aus um die Code-Dokumentation zu erstellen
 */
gulp.task('doc', () => {
    return gulp.src(root).pipe(esdoc({
        destination: paths.documentation,
        index: path.join(root, 'README.md')
    }));
});

/**
 * Gulp-Task: Baut die Applikation fuer das Deployment
 * - Fuehrt die Tests aus
 * - Erstellt die Code-Dokumentation
 * - Erstellt das Webpack-Bundle und kopiert es nach /target/build
 * - Kopiert index.html nach /target/build
 */
gulp.task('build', ['test-selenium-webgrid', 'doc'], (done) => {
    gulp.src(path.join(root, 'index.html')).pipe(gulp.dest(paths.build));

    return webpack(webpackConfig.production, done);
});

/**
 * Gulp-Task: Standardfall mit 'gulp' kopiert das HTML nach /dist und startet Webserver
 */
gulp.task('default', ['copyHtml', 'serve']);