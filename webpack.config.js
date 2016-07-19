/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Webpack Konfigurationsdatei
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
var webpack = require('webpack');
var extend = require('node.extend');
var path = require('path');
var browserSyncPlugin = require('browser-sync-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var buildPath = path.join(__dirname, 'target/build');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webjsConfig = require('./config/shared.build.config');

/**
 * Gemeinsame Konfigurationsdatei fuer Webpack (der Teil, der fuer alle Umgebungen gleich ist)
 * @type {} Webpack Konfiguration
 */
var commonConfig = exports.commonConfig = {
    context: path.resolve(__dirname, 'src/app'),
    // Einstiegspunkt fuer Webpack
    entry: {
        app: './app.js', vendor: [
            'angular',
            'angular-ui-router',
            'angular-resource',
            'angular-translate',
            'angular-translate-loader-static-files',
            'angular-ui-bootstrap',
            'bootstrap/dist/css/bootstrap.css',
            'jquery'
        ]
    },
    // Modulkonfiguration fuer alle Dateitypen, welcher Loader soll verwendet werden
    module: {
        loaders: webjsConfig.webpackLoaders
    },
    resolve: {
        fallback: path.join(__dirname, 'node_modules')
    },
    resolveLoader: {fallback: path.join(__dirname, 'node_modules')}
};

/**
 * Production Konfigurationsdatei fuer Webpack (der Teil, der nur fuer den produktiven Build ist)
 * @type {} Webpack Konfiguration
 */
exports.production = extend({}, commonConfig, {
    output: {
        path: buildPath,
        filename: '[name].[chunkhash].js'
    }, plugins: [
        new ngAnnotatePlugin({add: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true, compress: {
                warnings: true
            }
        }),
        // automatisches Einfügen der Dateien app und vendor
        new HtmlWebpackPlugin({
            template: '../index.html'
        })
    ], devtool: 'cheap-source-map'
});

/**
 * Development Konfigurationsdatei fuer Webpack (der Teil, der nur fuer den Development Build ist)
 * @type {} Webpack Konfiguration
 */
exports.development = extend({}, commonConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    }, plugins: [
        new browserSyncPlugin({
            proxy: 'localhost:3000'
        }),
        new HtmlWebpackPlugin({
            template: '../index.html'
        })
    ], watch: true, devtool: 'source-map'
});