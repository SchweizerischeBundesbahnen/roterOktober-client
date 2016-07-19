/*
 * @author u215942 (Stefan Zeller)
 * @version: 1.0.1
 * @since 04.04.2016
 */

exports.webpackLoaders = [
    {
        test: /\.js$/, exclude: [/node_modules/], loader: 'babel'
    }, {
        test: /\.json$/, loader: 'json'
    }, {
        test: /\.html$/, loader: 'raw'
    }, {
        test: /\.css$/, loader: 'style!css'
    }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader'
    }, {
        test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
        test: /\.ttf$/, loader: 'file-loader'
    }, {
        test: /\.eot$/, loader: 'file-loader'
    }
];