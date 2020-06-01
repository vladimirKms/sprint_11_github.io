
const path = require('path');
<<<<<<< HEAD
const webpack = require('webpack');
=======
>>>>>>> f918a62b7aa56a604ef441c5b6dc0efb2e3ca672
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
<<<<<<< HEAD

=======
const webpack = require('webpack');
>>>>>>> f918a62b7aa56a604ef441c5b6dc0efb2e3ca672
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
                { // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            exclude: /node_modules/, // исключает папку node_modules
            use: { loader: "babel-loader" } // весь JS обрабатывается пакетом babel-loader
			 },
                 {
            test: /\.css$/,
            use:  [
                (isDev ? 'style-loader' :
                MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
                },
             {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: ['file-loader?name=../images/[name].[ext]', // указали папку, куда складывать изображения
                            {
                                    loader: 'image-webpack-loader',
                                    options: {}
                            },
                    ]
             },

             {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
            },

            ]
        },
        plugins: [ 
            new MiniCssExtractPlugin({
                /*filename: 'style.[contenthash].css',}),*/
                filename: 'index.[contenthash].css',}),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                        preset: ['default'],
                },
                canPrint: true,
        }),  
            new HtmlWebpackPlugin({
                // Означает, что:
                inject: false, // стили НЕ нужно прописывать внутри тегов
                template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
<<<<<<< HEAD
                filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
                minify:
                    false
                    /*collapseWhitespace: true*/
                
=======
                filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
>>>>>>> f918a62b7aa56a604ef441c5b6dc0efb2e3ca672
              }),
              new WebpackMd5Hash(),
              new webpack.DefinePlugin({
                  'NODE_ENV':JSON.stringify(process.env.NODE_ENV)
              }),
            ]

};