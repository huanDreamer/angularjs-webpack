const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',

    entry: {
        'main': __dirname + "/app/main.js",
        'lib': __dirname + "/app/lib.js",
        'style': __dirname + "/app/style.js"
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].js"
    },

    devServer: {
        port: 11003,
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: false, //实时刷新,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|lib)/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ]
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ico$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]?[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /index\.html/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'templates/[path][name].[ext]?[hash:8]'
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[ext]?[hash:8]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'fonts/[name].[ext]?[hash:8]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "window.$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "SockJS": "sockjs-client",
            "BootstrapDialog": "bootstrap3-dialog"
        })
    ]

};