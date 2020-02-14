const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');

module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 5000,
        disableHostCheck: true,
        clientLogLevel: 'info',
        hot: true,
        watchOptions: {
            poll: true,
            ignored: [/node_modules/, /dist/]
        }
    },
    configureWebpack: {
        optimization: {
            minimizer: [new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                sourceMap: false
            })],
        },
    },
    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    },
    lintOnSave: false,
    runtimeCompiler: true,
    productionSourceMap: false
};